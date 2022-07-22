const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const path = require("path")
const cors = require("cors")
const {config} = require("./config")
const numCpus = require("os").cpus().length
const logger = require("./utils/loggers/winston")
const cluster = require("cluster")

if(config.MODE === 'FORK'){
    logger.info("inciando en modo fork")
    httpServer.listen(config.PORT, ()=>{
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
        httpServer.listen(config.PORT, ()=>{
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
const passportConfig = require("./utils/passport_jwt")
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

//websocket
io.on("connection", async socket => {
    const logger = require("./utils/loggers/winston")
    const MessageModel = require("./models/message.js")
    const jwt = require("jsonwebtoken")
    const {SECRET_KEY}  = require("./config").config
    let user = ''
    socket.on("client:NewConnection", async data => {
        let {token} = data
        try {
            if(token){
                user = await jwt.verify(token,SECRET_KEY)
                let messagesList = await MessageModel.find({})
                socket.emit("server:SendMessagesList",{
                    messagesList: messagesList

                })
            }  
        } catch (error) {
            logger.error(error)
        }
        
    })
    console.log(socket.id)
    socket.on("client:newMessage", async message => {
        if(!user || user === '')
        return;
        const date = new Date()
        const fecha = date.toLocaleDateString()
        const hora = date.toLocaleTimeString()
        const fyh = `El dia: ${fecha} a las ${hora}`
        let newMessage = {
            body: message.body,
            type: message.type,
            email: user.email,
            fyh: fyh
        }
        let newMessageToSave = await new MessageModel(newMessage)
        await newMessageToSave.save()
        let messagesList = await MessageModel.find({})
        
        socket.emit("server:SendUpadtedList",{
            messagesList: messagesList

        })
        
    })
    socket.on("client:getAnswers", async data => {
        try{
            let {id} = data
            const updatedMessage = await MessageModel.findById(id)
            socket.emit("server:sendAnsers", {
                updatedMessage
            })

        }catch(error){
            logger.error("error")
        }
    })
    socket.on("client:newAnswer", async data => {
        try{

            const {email, answer, id} = data
            const date = new Date()
            const fecha = date.toLocaleDateString()
            const hora = date.toLocaleTimeString()
        const fyh = `El dia: ${fecha} a las ${hora}`
        const message = await MessageModel.findById(id)
        let {answers} = message
        answers = [
            ...answers,
            {
                email,
                body: answer,
                fyh
            }
        ]
        message.answers = answers
        console.log(message)

        await MessageModel.findByIdAndUpdate(id, {answers: answers})
        let updatedMessage = await MessageModel.findById(id)
        socket.emit("server:sendUpdatedAnswers", {
            updatedMessage
        })
    }catch(error){
        logger.error(error)
    }
    })
})

