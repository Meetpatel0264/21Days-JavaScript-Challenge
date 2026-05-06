document.addEventListener("DOMContentLoaded", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsDiv = document.getElementById("cartItems");
    const totalPriceEl = document.getElementById("totalPrice");
    const cartCountEl = document.querySelector(".hero-icon-1 span");

   function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("fade-out"); 
        setTimeout(() => toast.remove(), 500); 
    }, 4000);
}


    function updateCartCount() {
        if (cartCountEl) {
            const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountEl.innerText = totalQty;
        }
    }

    function renderCart() {
        cartItemsDiv.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = `
                <div class="empty-cart text-center py-5">
                    <h4>Your cart is empty!</h4>
                    <p>Add products from the shop to see them here.</p>
                    <a href="index.html" class="btn btn-outline-light btn-cart-hover mt-2">Go Shopping</a>
                </div>
            `;
            totalPriceEl.innerText = 0;
            updateCartCount();
            return;
        }

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            cartItemsDiv.innerHTML += `
    <div class="row align-items-center cart-item py-2 border-bottom">

        <div class="col-2 col-sm-1 text-center">
            <h5>${index + 1}.</h5>
        </div>

        <div class="col-4 col-sm-2 text-center mb-2 mb-sm-0">
            <img src="${item.imageURL}" class="img-fluid" alt="${item.name}" style="max-width:80px;">
        </div>

        <div class="col-6 col-sm-4">
            <h6 class="mb-1">${item.name}</h6>
            <p class="mb-0">$${item.price.toFixed(2)}</p>
        </div>

        <div class="col-4 col-sm-2 d-flex align-items-center gap-2 mb-2 mb-sm-0">
            <button class="qty-btn-1 btn btn-outline-light btn-sm" onclick="changeQty(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn-1 btn btn-outline-light btn-sm" onclick="changeQty(${index}, 1)">+</button>
        </div>

        <div class="col-4 col-sm-1 mb-2 mb-sm-0">
            $${(item.price * item.quantity).toFixed(2)}
        </div>

        <div class="col-4 col-sm-2 text-end">
            <button class="remove-btn-1 btn btn-danger btn-sm" onclick="removeItem(${index})">
                <i class="ri-delete-bin-line"></i>
            </button>
        </div>

    </div>
`;

        });

        totalPriceEl.innerText = total;
        updateCartCount();
    }

    window.changeQty = function (index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
            showToast("Minimum quantity is 1");
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    window.removeItem = function (index) {
        const removedItem = cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        showToast(`${removedItem[0].name} removed from cart`);
    }

    
    const checkoutBtn = document.getElementById("checkoutBtn");
    
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            showToast("Your cart is empty!");
            return;
        }
        
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
        
        showToast("✅ Checkout successful! Thank you for your purchase.");
    });
    
    renderCart();   

});
