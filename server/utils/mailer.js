import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

const typeEmail = [{code: {html: "sendCodeEmail.html", content: "ma-xac-thuc"}}, {link: {html: "sendLinkEmail.html", content: "link-xac-thuc"}}];

export const sendVerificationEmail = async (toEmail, subject, authContent, code, type) => {
  const emailType = typeEmail.find((item) => item[type]); 

  const templatePath = path.join(__dirname, "../emailSample", emailType[type].html);

  let html = fs.readFileSync(templatePath, "utf-8");

  html = html.replace("noi-dung-xac-thuc", authContent);
  html = html.replace(emailType[type].content, code);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  // Cấu hình thông tin email
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: toEmail,
    subject: subject, 
    html: html,
  };

  // Gửi email
  await transporter.sendMail(mailOptions);
};
