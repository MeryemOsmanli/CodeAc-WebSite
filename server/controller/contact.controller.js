const sendContactMail = require("../helpers/sendMail");


const ContactController = {
    post: async (req, res) => {
        try {
            const {
                contactName,
                contactEmail,
                contactNumber,
                contactContent,
            } = req.body
            sendContactMail(contactEmail, contactName, contactContent,contactNumber)
            res.status(200).send({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
}

module.exports = ContactController;