// var authorName = document.getElementById('author')
// var list = document.getElementById('list')




// function addCart(){
//     let li = document.createElement("li")
//     li.innerHTML = "Ali";

//     list.appendChild(li);
// }

var iconCart = document.querySelector('.icon-cart')
var body = document.querySelector('body')
var closeCart = document.querySelector('.close')

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})