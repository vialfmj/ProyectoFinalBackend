
const productsContainer = document.getElementById("productsContainer")
const  getProducts = async ()=> {
    let products = await (await fetch("/api/productos")).json()
    let div = document.createElement("div")
}
getProducts();

const adderForm = document.getElementById("adderForm")
adderForm.addEventListener("submit" , async (event) => {
    event.preventDefault()
    let formData = new FormData(event.currentTarget)
    await fetch("/api/productos",{
        method: 'POST',
        body: formData
    })
})