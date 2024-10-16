import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendLoginEmail(userEmail: string, otp: string) {
  try {
    await transporter.sendMail({
      from: '"Blindly Social" <your-email@gmail.com>',
      to: userEmail,
      subject: "Blindly Social Login Verification",

      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; color: #333;">Welcome to Blindly Social!</h2>
        <p style="font-size: 18px; color: #555;">Hi there,</p>
        <p style="font-size: 16px; color: #555;">Thank you for choosing Blindly Social. Please use the one-time password (OTP) below to log in to your account:</p>

        <div style="text-align: center; margin: 30px 0;">
          <p style="font-size: 24px; font-weight: bold; color: #4CAF50; background-color: #f9f9f9; padding: 15px; border-radius: 5px; display: inline-block;">
            ${otp}
          </p>
        </div>

        <p style="font-size: 16px; color: #555;">This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email or contact our support team.</p>

        <p style="font-size: 16px; color: #555;">Best regards,<br/>Blindly Social Team</p>
        
      </div>`,
    });
  } catch (error) {
    console.error("Error sending login email:", error);
  }
}
