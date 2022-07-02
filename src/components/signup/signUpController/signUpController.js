class SignUpController {
    getForm = async(req,res,next) => {
        res.render("signup")
    }
    signUp = async (req, res, next) => {
        try {
            let data = req.body
            console.log(data)
            res.redirect("http://localhost:8080")
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new SignUpController()