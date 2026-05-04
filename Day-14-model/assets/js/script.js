const modal=document.getElementById("modal")
const open=document.getElementById("openModal")
const close=document.getElementById("closeModal")
const confirm=document.getElementById("confirmModal")

open.onclick=()=>modal.classList.add("active")

close.onclick=()=>modal.classList.remove("active")

confirm.onclick=()=>modal.classList.remove("active")

window.onclick=e=>{
if(e.target===modal){
modal.classList.remove("active")
}
}