const nodemailer = require('nodemailer');
require('dotenv').config()
const handleSendMail = require('../templates/sendMailTemplate')
async function sendContactMail(email, name, content, contactNumber) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "bd7hgdb72@code.edu.az",
            pass: 'bead koxu gomv jnxa',
        },
    });

    const mailOptions = {
        from: email,
        to: "bd7hgdb72@code.edu.az",
        subject: 'New Contact Form Submission',
        html: handleSendMail(name, email, content, contactNumber)

    };

    await transporter.sendMail(mailOptions);



}

module.exports = sendContactMail