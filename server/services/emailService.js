async function sendResetPasswordEmail(toEmail, resetLink) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "Expense Tracker", email: "maheraayush2303@gmail.com" },
      to: [{ email: toEmail }],
      subject: "Reset your Expense Tracker password",
      htmlContent: `
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
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Failed to send reset email");
  }
}

module.exports = { sendResetPasswordEmail };
