const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")
const {mongoose} = require("../DB/mongo_atlas")
const {DB_USER, DB_PASS} = require("../config").mongo_atlas




const { encrypt, verify } = require("./encrypt")
const UserModel = require("../models/user")

const transporter = require("../utils/nodemailer/transporter")
const enviarEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}
const passportConfig = (app) => {

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {

    let correctPass = ""
    let user = await UserModel.findOne({ email: username })
    if(user) 
    correctPass =  await verify(user.password, password)
    if (!user) return done(null, false);

    if (correctPass === false) return done(null, false);
    return done(null, user);
}));
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        let user = req.body
        let userfind = await UserModel.findOne({ email: username })
        if (userfind) return done("Already redistered!");

        let passEncrypted = await encrypt(user.password)
        user.password = passEncrypted

        let newUser = await new UserModel(user)
        await newUser.save()
        const mailOptions = {
            from: 'ServidorNodeJs',
            to: `testmailfranco@gmail.com`,
            subject: `Nuevo usuario!`,
            html: `Nuevo usuario: ${JSON.stringify(user)}`
        }
        enviarEmail(mailOptions)
        return done(null, newUser);
    } catch (error) {
        console.log("passport:",error)
    }


}));

passport.serializeUser((username, done) => {
    done(null, username.email);
})

passport.deserializeUser(async (username, done) => {
    let user = await UserModel.findOne({ email: username })
    done(null, user);
})
//session setupS 
const MongoStore = require("connect-mongo")
const advancedOptions = {useNewUrlParser:true, useUnifiedTopology:true }
app.use(session({
    secret: 'palbrasecreta',
    resave: true,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.6fibj.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }),
    cookie: {
        maxAge: 600000
    }
}))



app.use(passport.initialize());
app.use(passport.session());
}

module.exports = passportConfig