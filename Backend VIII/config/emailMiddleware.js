const nodemailer = require("nodemailer");
require('dotenv').config();

const sendMailOnSave = async function (doc) {
    try {
        console.log('Doc = ', doc);

        // creating a transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // sending mail
        let info = await transporter.sendMail({
            // sender mail
            from: `Admin Krushna Tawri`,
            to: doc.email,
            subject: 'New file uploaded on Cloudinary',
            html: '<b>Hello User</b> <p>File Uploaded Successfully on Cloudinary</p> <p>View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>'
        });

        console.log('Info ', info);
        console.log("Message sent: %s", info.messageId);
    }
    catch (err) {
        console.error(err);
    }
};

module.exports = sendMailOnSave;
