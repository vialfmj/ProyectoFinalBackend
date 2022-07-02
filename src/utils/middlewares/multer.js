
const multer  = require('multer')

const mimeTypes = require("mime-types")

const storage = multer.diskStorage({
    destination: './src/public/assets',
    filename: (req,file,cb) => {
        cb("", Date.now() + '.' + mimeTypes.extension(file.mimetype))
    }
})

const upload = multer({
    storage: storage
})

module.exports = {
    upload
}
