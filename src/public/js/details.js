
let url = window.location.pathname.split("/")
let idProd = url[url.length-1]


const addToCartButton = document.getElementById("addToCartButton")
addToCartButton.addEventListener("click", async () => {
    let {myCart} = await (await fetch("/profile/getmycart")).json()
    let quantity = document.getElementById("quantity").value
    if(quantity < 1)
    alert("debe ingresar una cantidad correcta")
    let response =await fetch (`/carrito/addToCart/?idProd=${idProd}&idCart=${myCart}&cant=${quantity}`)
    console.log(response.redirected)
    if(response.redirected)
    window.location.href = `/carrito/micarrito/${myCart}`
})