// controllers/contactController.js
const { sendMail } = require('../utils/mailer');

const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    // Gửi email
    await sendMail(email, 'Contact Form Submission', `Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

    // Trả lời thành công
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    // Trả lời lỗi
    return res.status(500).json({ error: 'Error while sending email' });
  }
};

module.exports = { sendContactEmail };
