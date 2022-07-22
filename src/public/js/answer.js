const socket = io()
let URLsearch = window.location.search
let queryParams = URLsearch.split('=')
let id = queryParams[queryParams.length-1]

const answersContainer = document.getElementById("answersContainer")
const answerForm = document.getElementById("answerForm")

socket.emit("client:getAnswers",{
    id
})

answerForm.addEventListener("submit", event => {
    event.preventDefault()

    const email = document.getElementById("answerEmail").value
    const answer = document.getElementById("answerText").value


    socket.emit("client:newAnswer", {
        email: email,
        answer: answer,
        id: id
    })
})
socket.on("server:sendAnsers", data => {
    let {answers} = data.updatedMessage 
    console.log(answers)
    let div = document.createElement('div')


    answers.forEach(answer => {
        div.innerHTML += `                
        <div class="row mt-3">
        <div class="col-md-3">${answer.email}:</div>
        <div class="col-md-5">${answer.body}</div>
        <div class="col-md-3">${answer.fyh}</div>
        </div>`
    })
    answersContainer.append(div)
})
socket.on("server:sendUpdatedAnswers", data => {
    let {answers} = data.updatedMessage 
    console.log(answers)
    let div = document.createElement('div')
        div.innerHTML += `                
        <div class="row mt-3">
        <div class="col-md-3">${answers[answers.length-1].email}:</div>
        <div class="col-md-5">${answers[answers.length-1].body}</div>
        <div class="col-md-3">${answers[answers.length-1].fyh}</div>
        </div>`
    answersContainer.append(div)
})


