const mongoose = require('mongoose')
const logger = require("../utils/loggers/winston")

const {mongo_atlas, config} = require("../config/index")

let mongoURI = ''
if( config.ENV === "DEVELOPMENT")
    mongoURI = `mongodb://localhost:27017/ecommerce`
if( config.ENV === "PRODUCTION")
    mongoURI = `mongodb+srv://${mongo_atlas.DB_USER}:${mongo_atlas.DB_PASS}@cluster0.6fibj.mongodb.net/?retryWrites=true&w=majority`
let connection
(async ()=>{
    try {
        connection = await mongoose.connect(mongoURI, {useNewUrlParser:true, useUnifiedTopology:true })
    } catch (error) {
        logger.error(error, "error in config/mongoDB.js")
    }

})();

module.exports = {connection, mongoose, mongoURI}