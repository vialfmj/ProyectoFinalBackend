const jwt = require("jsonwebtoken")

const generateToken = async (user) => {
    let token = jwt.sign(user, 'palabrasecreta')
    return token
}

module.exports = generateToken