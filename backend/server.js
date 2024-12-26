const express = require('express');
const app = express();

// packages
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

// connection to DB and cloudinary
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

// routes
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payments');
const courseRoutes = require('./routes/course');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');



// Sử dụng body-parser để phân tích JSON request
app.use(bodyParser.json());

// Tạo transporter với thông tin tài khoản email của bạn


// middleware 
app.use(express.json()); // to parse JSON body
app.use(cookieParser());
app.use(
    cors({
        origin: "*", // You can replace this with the frontend URL if needed
        credentials: true
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// API route for contact form submission
app.post('/api/v1/contact', async (req, res) => {
  const { firstname, lastname, email, phoneNo, message } = req.body;

  if (!firstname || !lastname || !email || !phoneNo || !message) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const mailOptions = {
    from: email,
    to: process.env.MAIL_RECEIVER, // Send to your email
    subject: `Contact from ${firstname} ${lastname}`,
    text: `
      Name: ${firstname} ${lastname}
      Email: ${email}
      Phone: ${phoneNo}
      Message: ${message}
    `,
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!', info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email. Please try again.' });
  }
});

// connections to DB and Cloudinary
connectDB();
cloudinaryConnect();

// API routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/contact', contactRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send(`
    <div>
      This is the Default Route  
      <p>Everything is OK</p>
    </div>
  `);
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
