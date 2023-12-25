const nodemailer = require("nodemailer");

export const sendEmail = async function (options) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "admin@blogAI.com",
    to: options.to,
    text: options.text,
    html: options.html,
    subject: options.subject,
  });
};
