const productService = require("../../Products/services/productsService")
const ProfileService = require("../service/profileService")
class profileController {
    getProfile = async (req,res,next) => {
            if(req.user){
                let data = await productService.getAll();
                res.render("profile",{
                    name: req.user.firstName,
                    avatar: req.user.avatar,
                    cartId: req.user.cartId,
                    data: data
                })
            }
            else
            res.redirect("/login")


    }
    getProfileData = async (req,res,next) => {
        res.render("profile_data",{
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            address: req.user.address,
            age: req.user.age,
            phone: req.user.phone,
            email: req.user.email,
            avatar: req.user.avatar
        })
    }
    getMyCart = async (req,res,next) => {
        res.json({myCart: req.user.cartId})
    }
}

module.exports = new profileController()