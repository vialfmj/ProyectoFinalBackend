const {config} = require("../../config")

module.exports = app => {
    app.get("/config", (req,res,next) => {
        res.render("config", {config})
    })
}