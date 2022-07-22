const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", async event => {
    event.preventDefault()
     const email = document.getElementById("email").value
     const password = document.getElementById("password").value
     let data = {
        email,
        password
     }

    let response = await fetch("/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    let responsejson = await response.json()
    if(responsejson.token){
        window.localStorage.setItem("token", responsejson.token)
        responseGet = await fetch("/profile",{
            headers:{
                authorization: `Bearer ${window.localStorage.getItem("token")}` 
            }
        })
        if (responseGet.status === 200)
        window.location.href = "/profile/me"
    }
    else
    alert(`Error: ${responsejson.message}`) 
})