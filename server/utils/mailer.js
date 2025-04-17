import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeEmail = [
  { code: { html: "sendCodeEmail.html", content: "ma-xac-thuc" } },
  { link: { html: "sendLinkEmail.html", content: "link-xac-thuc" } },
];

export const sendVerificationEmail = async (
  toEmail,
  subject,
  authContent,
  code,
  type
) => {
  const emailType = typeEmail.find((item) => item[type]);

  const templatePath = path.join(
    __dirname,
    "../emailSample",
    emailType[type].html
  );

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

export const sendOrderEmail = async (
  toEmail,
  { orderId, orderDate, total, products }
) => {
  const templatePath = path.join(
    __dirname,
    "../emailSample",
    "sendProductEmail.html"
  );

  let html = fs.readFileSync(templatePath, "utf-8");

  html = html.replace("i-d", orderId);
  html = html.replace(
    "date",
    new Date(orderDate)
      .toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", "")
  );
  html = html.replace(
    "total",
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(total)
  );

  const productsHTML = `
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Tên sản phẩm</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Số lượng</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Key game</th>
        </tr>
      </thead>
      <tbody>
        ${products
          .map(
            (item) => `
          <tr style="border: 1px solid #ddd;">
            <td style="padding: 10px; border: 1px solid #ddd;">${
              item.productName
            }</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              item.quantity
            }</td>
            <td style="padding: 10px; border: 1px solid #ddd;">
              ${item.keys
                .map(
                  (key) =>
                    `<div style="margin-top: 8px; margin-bottom: 8px">${key}</div>`
                )
                .join("")}
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  html = html.replace("noi-dung", productsHTML);

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
    subject: "GameShop giao hàng",
    html: html,
  };

  await transporter.sendMail(mailOptions);
};
