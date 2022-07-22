require("dotenv").config()



const config = {
    PORT: process.env.PORT || 8080,
    MODE: process.env.MODE || 'FORK',
    ENV: process.env.NODE_ENV || 'DEVELOPMENT',
    SESSION_EXP: process.env.SESSION_EXP || 600000,
    SECRET_KEY: process.env.SECRET_KEY || 'palabrasecreta123',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL
}
const nodemailer = {
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS
}
const twilio = {
    accountSid:process.env.TWILIO_ACCOUNT_SID , 
    authToken: process.env.TWILIO_AUTH_TOKEN
}

const mongo_atlas = {
    DB_USER: process.env.MONGODB_USER,
    DB_PASS: process.env.MONGODB_PASS
}

module.exports = {
    config,
    mongo_atlas,
    twilio,
    nodemailer
}