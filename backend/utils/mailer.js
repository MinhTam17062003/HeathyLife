// utils/mailer.js
const nodemailer = require('nodemailer');

// Cấu hình transporter để kết nối với Gmail (hoặc dịch vụ email bạn chọn)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Sử dụng Gmail hoặc dịch vụ khác
  auth: {
    user: process.env.MAIL_USER,  // Địa chỉ email của bạn (ví dụ: 'example@gmail.com')
    pass: process.env.MAIL_PASS,  // Mật khẩu email của bạn
  },
});

// Hàm gửi email
const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.MAIL_USER, // Email người gửi
    to: process.env.MAIL_RECEIVER, // Email người nhận
    subject, // Tiêu đề email
    text, // Nội dung email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error while sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendMail };
