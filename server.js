require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));


// Get email credentials from environment variables
const EMAIL_USER = process.env.EMAIL_USER; // Your email
const EMAIL_PASS = process.env.EMAIL_PASS; // Your app password

// Set up Nodemailer transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS // Use an app password if using Gmail
    }
});

// Route to send feedback
app.post('/send-feedback', (req, res) => {
    const { feedback } = req.body;

    if (!feedback) {
        return res.status(400).json({ message: "Feedback is required." });
    }

    const mailOptions = {
        from: 'feedbackweb4@gmail.com',
        to: 'feedbackweb4@gmail.com',
        subject: 'New Feedback from Website',
        text: `Feedback: ${feedback}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send feedback', error });
        }
        res.status(200).json({ message: 'Feedback sent successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});