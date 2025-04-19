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
      throw new Error("Email and password are required");
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser?.emailVerified instanceof Date) {
      throw new Error("User already exist try logging in");
    }
    const existing_otp = await prisma.verificationToken.findFirst({
      where: {
        identifier: existingUser?.id,
      },
    });

    if (existing_otp && new Date(existing_otp.expires).getTime() > Date.now()) {
      throw new Error("OTP already sent to this email");
    } else if (existingUser) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      try {
        try {
          await prisma.verificationToken.create({
            data: {
              identifier: existingUser.id,
              token: otp,
              expires: new Date(Date.now() + 60 * 60 * 1000),
            },
          });
        } catch (error) {
          console.error(error);
          throw new Error("Error creating OTP");
        }
        try {
          await sendEmailOtp({
            name: existingUser.name as string,
            email: email,
            otp: otp,
          });
        } catch (error) {
          console.error(error);
          throw new Error("Error sending email");
        }

        return {
          success: true,
          message: "Otp Sent",
        };
      } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
      }
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
    } catch (error: any) {
      throw new Error(error.message);
    }

    try {
      await sendEmailOtp({
        name: name,
        email: email,
        otp: otp,
      });
    } catch (error) {
      console.error(error);
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
  try {
    if (!email || !otp) {
      throw new Error("Email and OTP are required");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    } else if (user.emailVerified instanceof Date) {
      throw new Error("User already verified");
    }
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: user.id,
        token: otp,
      },
    });
    if (!verificationToken) throw new Error("Invalid OTP");
    if (new Date(verificationToken.expires).getTime() < Date.now()) {
      throw new Error("OTP has expired, signup again");
    }
    try {
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
    } catch (error: any) {
      console.error(error);
      throw new Error("Error verifying OTP");
    }
    return {
      success: true,
      message: "User verified",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
