const bcrypt = require("bcrypt")

const encrypt = async (pass) => {
   const salt = await  bcrypt.genSalt(10)
   const hashPass = await bcrypt.hash(pass, salt)
   return hashPass
}
const verify = async (hash,pass) => {
   let result = bcrypt.compare(pass,hash)
   return result
}


module.exports = {
    encrypt,
    verify
}