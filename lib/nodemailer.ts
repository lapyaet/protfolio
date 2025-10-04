import nodemailer from "nodemailer";

const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;
const receiveEmail = process.env.CONTACT_RECEIVER;
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export const mailOptions = {
  from: email,
  to: receiveEmail,
};
