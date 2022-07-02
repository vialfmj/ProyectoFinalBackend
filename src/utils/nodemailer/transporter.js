const nodemailer = require("nodemailer")
const {NODEMAILER_USER, NODEMAILER_PASS} = require("../../config").nodemailer

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: `${NODEMAILER_USER}`,
        pass: `${NODEMAILER_PASS}`
    }
});
module.exports = transporter