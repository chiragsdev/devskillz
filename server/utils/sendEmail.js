import nodemailer from "nodemailer";

const sendEmail = async function (email, subject, message) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to: email,
    subject: subject,
    html: message,
    headers: {
      "Content-Type": "text/html",
    },
  });
};

export default sendEmail;
