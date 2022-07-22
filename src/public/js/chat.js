const socket = io()

const token = window.localStorage.getItem("token")
socket.emit("client:NewConnection",{
    token
})

const formMessage = document.getElementById("formMessage")

formMessage.addEventListener("submit", event => {
    event.preventDefault() 
    const newMessage = document.getElementById("newMessage").value
    const date = new Date()
    const fecha = date.toLocaleDateString()
    const hora = date.toLocaleTimeString()
    const fyh = `${fecha} a las ${hora}`
    socket.emit("client:newMessage",{
        type: "usuario",
        body: newMessage,
        fyh: fyh
    })
})

socket.on("server:SendMessagesList", async data => {
    let {messagesList} = data
    console.log(messagesList)
    let historyContainer = document.getElementById("historyContainer")
    let div = document.createElement('div')
    let div2 = document.createElement('div')


    messagesList.forEach(message => {
        if(message.answers.length > 0){
            message.answers.forEach(answer => {

                div2.innerHTML += `
                <div class="row mt-3">
                <div class="col-md-3">${answer.email}:</div>
                <div class="col-md-6">${answer.body}</div>
                <div class="col-md-3">${answer.fyh}</div>
                </div>`  
            })

        }
        div.innerHTML += `                
        <div class="row mt-3">
        <div class="col-md-3">${message.email}:</div>
        <div class="col-md-5">${message.body}</div>
        <div class="col-md-3">${message.fyh}</div>
        <div class="col-md-1"><a href="/chat/answer/?msg=${message._id}"><button class="btn btn-primary">Responder</button></a></div>
        </div>`
        if(message.answers.length > 0)
        div.append(div2)
    })
    historyContainer.append(div)
})
socket.on("server:SendUpadtedList", async data => {
    let {messagesList} = data
    let historyContainer = document.getElementById("historyContainer")
    let div = document.createElement('div')
    div.innerHTML += `                
    <div class="row">
    <div class="col-md-3">${messagesList[messagesList.length-1].email}:</div>
    <div class="col-md-6">${messagesList[messagesList.length-1].body}</div>
    <div class="col-md-3">${messagesList[messagesList.length-1].fyh}</div>
    </div>`
    historyContainer.append(div)
})