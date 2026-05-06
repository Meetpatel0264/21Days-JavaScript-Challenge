let products = [
    {
        Id: 1,
        name: "Sanex – RFX2 Brushed Titanium",
        imageURL: "./assets/image/product-img-01.png",
        partsName: "Body Parts",
        review: 4.50,
        price: 32
    },
    {
        Id: 2,
        name: "M249 GAMMA Sliver with Full Chrome",
        imageURL: "./assets/image/product-img-02.png",
        partsName: "Electronic",
        review: 5,
        price: 30
    },
    {
        Id: 3,
        name: "Silver with Mirror Cut Face Wheels",
        imageURL: "./assets/image/product-img-03.png",
        partsName: "Electronic",
        review: 3,
        price: 20
    },
    {
        Id: 4,
        name: "M195 METHOS Black with Bronze Face",
        imageURL: "./assets/image/product-img-04.png",
        partsName: "Body Parts",
        review: 5,
        price: 100
    },
    {
        Id: 5,
        name: "HF-2 Gloss Black with Brushed Face",
        imageURL: "./assets/image/product-img-05.png",
        partsName: "Lighting",
        review: 4.50,
        price: 18
    },
    {
        Id: 6,
        name: "M249 GAMMA Sliver with Full Chrome",
        imageURL: "./assets/image/product-img-06.png",
        partsName: "Body Parts",
        review: 4,
        price: 19
    },
    {
        Id: 7,
        name: "Simple Leather Steering Wheel",
        imageURL: "./assets/image/product-img-07.png",
        partsName: "Repair Parts",
        review: 4,
        price: 5
    },
    {
        Id: 8,
        name: "Simple Leather Steering Wheel",
        imageURL: "./assets/image/product-img-08.png",
        partsName: "Body Parts",
        review: 3,
        price: 15
    },
    {
        Id: 9,
        name: "RFX2 Brushed Titanium",
        imageURL: "./assets/image/product-img-09.png",
        partsName: "Body Parts",
        review: 5,
        price: 50
    },
    {
        Id: 10,
        name: "SV-F4 Matte Bronze with Chrome Flip",
        imageURL: "./assets/image/product-img-03.png",
        partsName: "Repair Parts",
        review: 4.50,
        price: 25
    },
    {
        Id: 11,
        name: "TRUE HUMAN Anti-Theft backpack",
        imageURL: "./assets/image/product-img-04.png",
        partsName: "Body Parts",
        review: 4,
        price: 25
    },
    {
        Id: 12,
        name: "Hookaba LED Backpack",
        imageURL: "./assets/image/product-img-05.png",
        partsName: "Repair Parts",
        review: 5,
        price: 25
    },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsRow = document.getElementById("productRow");
const cartCount = document.getElementById("cart-count");

function generateStars(review) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(review)) {
            stars += `<i class="ri-star-fill"></i>`;
        } else if (i - review === 0.5) {
            stars += `<i class="ri-star-half-fill"></i>`;
        } else {
            stars += `<i class="ri-star-line"></i>`;
        }
    }
    return stars;
}


function renderProducts(list) {
    productsRow.innerHTML = "";

    list.forEach(p => {
        productsRow.innerHTML += `
            <div class="col-lg-3 col-sm-6 col-12 py-4">
                <div class="text-center card-main">
                    <div class="card-content">
                        <img src="${p.imageURL}" class="img-fluid" width="210">

                        <h3 class="sec-2-title">${p.partsName}</h3>
                        <h2 class="sec-2-dcs">${p.name}</h2>

                        <div>
                            ${generateStars(p.review)}
                            <span class="text-white ms-2">
                                (${p.review} Review)
                            </span>
                        </div>

                        <h2 class="text-white pt-3">$${p.price}.00</h2>
                    </div>

                    <div class="card-overlay">
                        <button class="add-cart-btn" onclick="addToCart(${p.Id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}


function showToast() {
    const toastEl = document.getElementById('cartToast');
    const toast = new bootstrap.Toast(toastEl, {
        delay: 2000
    });
    toast.show();
}

function addToCart(productId) {
    const product = products.find((item) => item.Id === productId);

    let cartIdx = cart.findIndex((product) => {
        return product.Id === productId;
    })

    if (cartIdx === -1) {
        product.quantity = 1;
        cart.push(product);
    } else {
        cart[cartIdx].quantity += 1;
    }


    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart-count").innerHTML = cart.length;

    showToast();

}

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        if (filter === "*") {
            renderProducts(products);
        } else {
            renderProducts(products.filter(p => p.partsName === filter));
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    cartCount.innerText = cart.length;
});
