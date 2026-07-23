const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

async function sendResetPasswordEmail(toEmail, resetLink) {
  await transporter.sendMail({
    from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your Expense Tracker password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Reset your password</h2>
        <p>You requested a password reset. Click the button below to set a new password. This link expires in 15 minutes.</p>
        <p style="margin: 24px 0;">
          <a href="${resetLink}" style="background:#2563eb;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;">
            Reset Password
          </a>
        </p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendResetPasswordEmail };
