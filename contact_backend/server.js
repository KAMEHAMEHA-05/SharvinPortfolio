const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,   // Your Gmail address
        pass: process.env.EMAIL_PASS    // App password (not your Gmail password)
    }
});

// API to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).send('Failed to send email');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
