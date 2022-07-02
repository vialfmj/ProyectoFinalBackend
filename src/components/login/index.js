const express = require("express")
const passport = require("passport")
const LoginController = require("./controller/loginController")

module.exports =app => {
    app.get("/login", LoginController.getLoginForm)
    app.post('/login', passport.authenticate('login', {failureRedirect: 'login', successRedirect:'/profile'}));
    app.get('/logout', (req, res, next) => {
        req.session.destroy(err => {
            if (err) res.send(JSON.stringify(err));
            res.redirect('login');
        })
    })
}