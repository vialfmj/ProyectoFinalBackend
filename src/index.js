const express = require("express")
const session = require("express-session")
const app = express()
const path = require("path")
const cors = require("cors")
const {config} = require("./config")
const numCpus = require("os").cpus().length
const logger = require("./utils/loggers/winston")
const cluster = require("cluster")

if(config.MODE === 'FORK'){
    logger.info("inciando en modo fork")
    //console.log("iniciando en modo fork")
    app.listen(config.port, ()=>{
        logger.info(`server on : http://localhost:${config.PORT} || master PID -> ${process.pid}`  )
})
}
if(config.MODE === 'CLUSTER'){
    logger.info("iniciando en modo cluster")
    if(cluster.isMaster){
        console.log(`master PID -> ${process.pid}`)
        for(let i = 0; i < numCpus; i++){
            cluster.fork()
        }
    }
    else{
        app.listen(config.PORT, ()=>{
            logger.info(`server on : http://localhost:${config.PORT} || worker -> ${process.pid}`  )
    })
    }
}
//settings
app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'ejs')

//middlewares
app.use(express.static("src/public"))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

//passport 
const passportConfig = require("./utils/passport")
passportConfig(app)

//routes
const serverRoutes = require('./routes')
serverRoutes(app)

app.get("/logout", (req,res) => {
    req.session.destroy(err => {
        if(!err) res.send("logout ok")
        else res.send({status: 'Logout ERROR', body: err})
    })
})

