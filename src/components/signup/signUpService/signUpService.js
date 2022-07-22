const logger = require("../../../utils/loggers/winston")
const {mongoose} = require("../../../DB/mongo_atlas")
const UserModel = require("../../../models/user")
const generateToken = require("../../../utils/tokenGenerator")
const {encrypt} = require("../../../utils/encrypt")
const transporter = require("../../../utils/nodemailer/transporter")
const {ADMIN_EMAIL} = require("../../../config").config


class SignUpService {
    signUp = async (newUser) => {
        try {
            if(!newUser.firstName || !newUser.lastName || !newUser.address || !newUser.age || !newUser.phone || !newUser.email || !newUser.password || !newUser.avatar){
                return {
                    status: 400,
                    message: "Faltan datos"
                }
            }
            let user = await UserModel.findOne({email: newUser.email})
            if(user)
            return {
                status:400,
                message: "Usuario ya registrado!"
            }
                
            if(!user)
            {
                let passEncrypted = await encrypt(newUser.password)
                newUser.password = passEncrypted
                let token = await generateToken({email: newUser.email})
                let userToSave = new UserModel(newUser)
                await userToSave.save()

                const mailOptions = {
                    from: 'ServidorNodeJs',
                    to: ADMIN_EMAIL,
                    subject: `Nuevo usuario registrado:`,
                    html: JSON.stringify(newUser)
                }
                try {
                    (async () => {
                        const info = await transporter.sendMail(mailOptions)
                        logger.info(info)
                    })();
                } catch (error) {
                    logger.error(`Error in sendingEmail: ${error.message}`)
                }
                

                return {
                    status: 200,
                    message: "Nuevo usario registrado",
                    token: token
                }
            }


        } catch (error) {
            logger.error(`SignUpService.signUp error: ${error}`)
        }
    }
}

module.exports = new SignUpService()