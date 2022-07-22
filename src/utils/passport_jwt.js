const passport = require("passport")
const session = require("express-session")

const UserModel = require("../models/user")
const {SESSION_EXP, SECRET_KEY} = require("../config").config
const {mongoURI} = require("../DB/mongo_atlas")


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let options = {}
options.secretOrKey = SECRET_KEY;
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

const passportJwtConfig = app => {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            let user = await UserModel.findOne({email: jwt_payload.email})
            if(user){
                return done(null, user)
            }
            else{
                return done(null, false)
            }
        } catch (error) {
            return done(error, false)
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user.email);
    })
    passport.deserializeUser(async (username, done) => {
        let user = await UserModel.findOne({ email: username })
        done(null, user);
    })
    // session setup
    const MongoStore = require("connect-mongo")
    const advancedOptions = {useNewUrlParser:true, useUnifiedTopology:true }
    app.use(session({
        secret: SECRET_KEY,
        resave: true,
        saveUninitialized:true,
        store: MongoStore.create({
            mongoUrl: mongoURI,
            mongoOptions: advancedOptions
        }),
        cookie: {
            maxAge: SESSION_EXP
        }
    }))
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = passportJwtConfig