
let cart = [];
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button onClick="addToCart(${product.id})" class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
	const toAdd = document.getElementById("cart-list");
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      cart = JSON.parse(storedCart); 
      console.log(cart);
    }
	toAdd.innerHTML = "";
    cart.forEach((item)=>{
        const li  = document.createElement('li');
        li.innerHTML += `${item.name} - $${item.price} <button onClick="removeFromCart(${item.id})" class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
        toAdd.appendChild(li);})	
}

// Add item to cart
function addToCart(productId) {
	const productToAdd = products.find((product) => productId === product.id);
	if(productToAdd){
        console.log('wotrking', productId)
        cart.push(productToAdd);
        sessionStorage.setItem("cart", JSON.stringify(cart));
		renderCart();
       
	}
}

// Remove item from cart
function removeFromCart(productId) {
    const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    
  }
}

document.getElementById('clear-cart-btn').addEventListener('click',clearCart);

// Clear cart
function clearCart() {
    cart = [];
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Initial render
renderProducts();
renderCart();
