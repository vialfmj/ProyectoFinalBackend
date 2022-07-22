const signUpForm = document.getElementById("signUpForm")

signUpForm.addEventListener("submit", async event => {
    event.preventDefault() 
    let formData = new FormData(event.currentTarget)
    let response = await fetch("/signup",{
        method: "POST",
        body: formData
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