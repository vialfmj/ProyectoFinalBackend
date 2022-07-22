const UserModel = require("../../../models/user")
const {verify} = require("../../../utils/encrypt")
const generateToken = require("../../../utils/tokenGenerator")

class LoginService {
    login = async (data) => {
        let user = await UserModel.findOne({email : data.email})
        if(!user)
        return {
            status: 400,
            message: "Credenciales Invalidas"
        }
        let verifyResult = await verify(user.password, data.password)
        if(verifyResult === false)
        return{
            status: 400,
            message: "Credenciales Invalidas"
        }
        if(verifyResult === true){
            let token = await generateToken({email: data.email})
            return {
                status: 200,
                message: "Exito",
                token 
            }
        }


    }
}
module.exports = new LoginService()