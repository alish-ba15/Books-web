// var authorName = document.getElementById('author')
// var list = document.getElementById('list')

// function addCart(){
//     let li = document.createElement("li")
//     li.innerHTML = "Ali";

//     list.appendChild(li);
// }

document.addEventListener("DOMContentLoaded", function () {
  var iconCart = document.querySelector(".icon-cart");
  var body = document.querySelector("body");
  var closeCart = document.querySelector(".close");
  var portfolioBoxes = document.querySelectorAll(".portfolio-box");
  let listCartHTML = document.querySelector(".cartlist")
  let iconCartSpan = document.querySelector(".icon-cart span");
  var hideForm = document.querySelector(".hideBook");
  var showForm = document.querySelector(".showForm");
  var closeForm =document.querySelector(".closeForm");
  var formButton =document.querySelector("submit");

 
  

  closeForm.addEventListener("click", () => {
    showForm.classList.remove('showAddForm'); 
  // body.classList.toggle("showCart");
});

  hideForm.addEventListener("click", () => {
      showForm.classList.add('showAddForm'); 
    // body.classList.toggle("showCart");
  });

  var listProducts = [];

  iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });

  closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });

  const addIdToHTML = () => {
    portfolioBoxes.forEach((portfolioBox, index) => {
      if (listProducts[index]) {
        portfolioBox.dataset.id = listProducts[index].id;
      }
    });
  };
 
  const addToCart = (productId) => {
    let thisProductInCart = carts.findIndex(
      (value) => value.productId == productId
    );
  
    if (carts.length <= 0) {
      carts = [
        {
          productId: productId,
          quantity: 1,
        },
      ];
    } else if (thisProductInCart < 0) {
      carts.push({
        productId: productId,
        quantity: 1,
      });
    } else {
      carts[thisProductInCart].quantity = carts[thisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
    // console.log(carts)
  };

  const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
  }

  const addCartToHTML = () => {
    let listCartHTML = document.querySelector(".cartlist");
    let totalQuantity = 0;
    listCartHTML.innerHTML = "";
    if (carts.length > 0) {
        carts.forEach((cart) => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement("div");
            newCart.dataset.id = cart.productId;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.productId);
            let info = listProducts[positionProduct];

            if (info && info.price !== undefined && cart.quantity !== undefined) {
                newCart.classList.add("item");
                let totalPrice = info.price * cart.quantity;
                console.log("Info:", info);
                console.log("Cart:", cart);
                console.log("Total Price:", totalPrice);
                
                newCart.innerHTML = `
                    <div class="img"><img src="${info.img}" alt=""></div>
                    <div class="bookName">
                        <p>${info.name}</p>
                    </div>
                    <div class="price">
                        <p class="price">Rs.${totalPrice}</p>
                    </div>
                    <div class="quantity">
                        <span class="minus">< </span>
                        <span>${cart.quantity}</span>
                        <span class="plus">></span>
                    </div>`;
                listCartHTML.appendChild(newCart);
                console.log("doneeee");
            } else {
                console.error("Info or quantity not defined for cart item:", cart);
            }
        });
    }
    iconCartSpan.innerHTML=totalQuantity;
};
listCartHTML.addEventListener('click', (event) => {
    if(event.target.classList.contains('minus') || event.target.classList.contains('plus')){
        let productId = event.currentTarget.dataset.id;
        addToCart(productId);
    }
})
  
  const initApp = () => {
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => {
        listProducts = data;
        addIdToHTML();

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
        console.log("🚀 ~ initApp ~ listProducts:", listProducts);
      });
  };

  initApp();

  portfolioBoxes.forEach((portfolioBox) => {
    portfolioBox.addEventListener("click", (event) => {
      let addCart = event.target.closest(".addCart");
      if (addCart) {
        let productId = event.currentTarget.dataset.id;
        addToCart(productId);
        // alert(productId);
      }
    });
  });
});

let carts = [];




// const submitData = () => {
//   var name = document.getElementById('names').value;
//   var imageBooks = document.getElementById('imageBooks').value;
//   var athnames = document.getElementById('athnames').value;
//   var userPrices = document.getElementById('userPrices').value;

//   jsonObject = {
//       name: "",
//       img: "",
//       price: "",
//       authorName: ""
//   }
//   jsonObject.name = name;
//   jsonObject.img = imageBooks;
//   jsonObject.price = userPrices;
//   jsonObject.authorName = athnames;

//   var str = JSON.stringify(jsonObject);
//   addBookToHTML(); // Call addBookToHTML after submitting the data
// }

// const addBookToHTML = () => {
//   var nameElement = document.getElementById('name');
//   var imageBook = document.getElementById('imageBook');
//   var athname = document.getElementById('athname');
//   var userPrice = document.getElementById('userPrice');

//   imageBook.src = jsonObject.img;
//   nameElement.innerHTML = jsonObject.name;
//   athname.innerHTML = "Author: " + jsonObject.authorName;
//   userPrice.innerHTML = "Price: Rs." + jsonObject.price; // Assuming price should be displayed with "Rs."
// }


// ... (existing code)

// Assuming you have some event that triggers the submitData function,
// for example, a button click event.
// document.getElementById('submitButton').addEventListener('click', function () {
//     submitData();
// });


