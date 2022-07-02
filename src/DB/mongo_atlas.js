const mongoose = require('mongoose')

const {mongo_atlas} = require("../config/index")




let connection
(async ()=>{
    try {
        connection = await mongoose.connect(`mongodb+srv://${mongo_atlas.DB_USER}:${mongo_atlas.DB_PASS}@cluster0.6fibj.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser:true, useUnifiedTopology:true })
    } catch (error) {
        console.log(error, "error in config/mongoDB.js")
    }

})();

module.exports = {connection, mongoose}