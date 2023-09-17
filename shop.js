let purchases = document.querySelectorAll(".add-cart");
// making an array of products
let products = [
  {
    name: "Hat (gray)",
    price: 50,
    quantity: 0,
  },
  {
    name: "Coat (black)",
    price: 100,
    quantity: 0,
  },
  {
    name: "Jacket (red)",
    price: 70,
    quantity: 0,
  },
  {
    name: "Socks (black)",
    price: 70,
    quantity: 0,
  },
  {
    name: "Bonsai Tree (pre-grown)",
    price: 20,
    quantity: 0,
  },
];
for (let i = 0; i < purchases.length; i++) {
  purchases[i].addEventListener("click", () => {
    cartSetHowMany(products[i]); // we loop through our array of links/buttons and the click triggers the event 
    getTotalCost(products[i])
  });
}
function getBackCartNumbers() {
  //gets our cart numbers back
  let productGetNums = localStorage.getItem("products");

  if (productGetNums) {
    document.querySelector(".cart span").textContent = productGetNums;
  }
}
function cartSetHowMany(product) {
  // adds how many items there is in the cart and cart it self aka main function
  let productGetNums = localStorage.getItem("products");
  productGetNums = parseInt(productGetNums);
  if (productGetNums) {
    localStorage.setItem("products", productGetNums + 1);
    document.querySelector(".cart span").textContent = productGetNums + 1;
  } else {
    localStorage.setItem("products", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setProduct(product);
}

function setProduct(product) {
  let cart = localStorage.getItem("product");
  cart = JSON.parse(cart);
  if(cart !==  null){
    if (cart[product.name] == undefined) {
        cart = {
            ...cart,
            [product.name]: product
        }
      }
      cart[product.name].quantity += 1;
    }else {
      product.quantity = 1;
      cart = {
        [product.name]: product,
      }
  }
  localStorage.setItem("product", JSON.stringify(cart));
}

function getTotalCost(product){

  let cost = localStorage.getItem("total");
  if (cost != null) {
  cost =  parseInt(cost);
  localStorage.setItem("total", cost + product.price)
}else {

  localStorage.setItem("total", product.price)
}

}

function displayProducts() {
  let cost = localStorage.getItem("total");
  if (cost && document.querySelector(".total")) {
    document.querySelector(".total").innerHTML = "total: "+cost;
  }
  let cart = localStorage.getItem("product");
 cart = JSON.parse(cart);

 let container = document.querySelector(".products")
 console.log(cart)
 if (cart  && products) 
 container.innerHTML = '';
 Object.values(cart).map(item => {
    container.innerHTML += `
    <div class="item">
    <span>Product: ${item.name}</span>
    </div>
    <div class="price">
    <span>Price: ${item.price}$</span>
    <div>
    <div class="quantity">
      <span>Quantity: ${item.quantity}</span>
    </div>
    `;
  })
 }

 getBackCartNumbers();
 displayProducts();

