import nm from "nodemailer";
export const EmailTransport = nm.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.RESEND_SMTP_USER,
    pass: process.env.RESEND_SMTP_PASS,
  },
});

export async function sendEmailOtp({
  email,
  otp,
  name,
}: {
  name: string;
  email: string;
  otp: string;
}) {
  await EmailTransport.sendMail({
    to: email,
    from: "no-reply@mail.blockx3.xyz",
    subject: "Verify your email",
    text: `Your OTP is ${otp}. Please verify your email within 24 hours.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Verify Your Email</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up! Please use the OTP below to verify your email address:</p>
        <div style="font-size: 20px; font-weight: bold; margin: 20px 0; color: #4CAF50;">
          ${otp}
        </div>
        <p>Alternatively, you can click the link below to verify your email:</p>
        <a href="${process.env.NEXTAUTH_URL}/auth/signup/verify-email?email=${email}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p style="margin-top: 20px;">Please note: This OTP is valid for 24 hours. If you did not sign up for this account, you can safely ignore this email.</p>
        <p>Best regards,<br>The BlockX3 Team</p>
      </div>
    `,
  });
}
