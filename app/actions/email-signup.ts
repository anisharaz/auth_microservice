"use server";

import { prisma } from "@/lib/db";
import { sendEmailOtp } from "@/lib/email";
import bcrypt from "bcryptjs";
export async function emailSignup({
  email,
  password,
  name,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser?.emailVerified instanceof Date) {
      return {
        success: false,
        message: "User already exist try logging in",
      };
    }
    const existing_otp = await prisma.verificationToken.findFirst({
      where: {
        identifier: existingUser?.id,
      },
    });

    if (existing_otp && new Date(existing_otp.expires).getTime() > Date.now()) {
      return {
        success: false,
        message:
          "OTP already sent to this email, please check your inbox for verification link",
      };
    } else if (existingUser) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await prisma.verificationToken.create({
        data: {
          identifier: existingUser.id,
          token: otp,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        },
      });
      await sendEmailOtp({
        name: existingUser.name!,
        email: email,
        otp: otp,
      });
      return {
        success: true,
        message: "Otp Sent",
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            name: name,
            email: email,
            password: hashedPassword,
          },
        });
        await tx.verificationToken.create({
          data: {
            identifier: user.id,
            token: otp,
            expires: new Date(Date.now() + 60 * 60 * 1000),
          },
        });
      });
    } catch (error) {
      throw new Error("Error creating user");
    }

    try {
      await sendEmailOtp({
        name: name,
        email: email,
        otp: otp,
      });
    } catch (error) {
      throw new Error("Error sending email");
    }

    return {
      success: true,
      message: "Otp Sent",
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function verifyOtp({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  if (!email || !otp) {
    return {
      success: false,
      message: "Email and OTP are required",
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  } else if (user.emailVerified instanceof Date) {
    return {
      success: false,
      message: "User already verified",
    };
  }
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: user.id,
      token: otp,
    },
  });
  if (!verificationToken) {
    return {
      success: false,
      message: "Invalid OTP",
    };
  }
  if (new Date(verificationToken.expires).getTime() < Date.now()) {
    return {
      success: false,
      message: "OTP has expired, signup again",
    };
  }
  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    await tx.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: user.id,
          token: otp,
        },
      },
    });
  });
  return {
    success: true,
    message: "User verified",
  };
}
