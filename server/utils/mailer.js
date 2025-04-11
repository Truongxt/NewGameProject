import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

export const sendVerificationEmail = async (toEmail, subject, authContent, code) => {
  const templatePath = path.join(__dirname, "../emailSample", "email.html");

  let html = fs.readFileSync(templatePath, "utf-8");

  html = html.replace("noi-dung-xac-thuc", authContent);
  html = html.replace("ma-xac-thuc", code);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: toEmail,
    subject: subject, 
    html: html,
  };

  await transporter.sendMail(mailOptions);
};