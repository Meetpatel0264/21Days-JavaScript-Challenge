const carsContainer = document.getElementById("carsContainer");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");

const cars = [
    {
        name: "BMW M4",
        brand: "lamborghini",
        price: "₹10 Cr Cr",
        image: "/assets/img/lamborghini1.avif"
    },
    {
        name: "Audi R8",
        brand: "audi",
        price: "₹3.3 Cr",
        image: "/assets/img/audi.jpg"
    },
    {
        name: "Mercedes AMG GT",
        brand: "mercedes",
        price: "₹2.7 Cr",
        image: "/assets/img/mercedes.webp"
    },
    {
        name: "Mercedes AMG GT",
        brand: "audi",
        price: "₹2.7 Cr",
        image: "/assets/img/audi2.avif"
    },
    {
        name: "Lamborghini Huracan",
        brand: "lamborghini",
        price: "₹8.50 Cr",
        image: "/assets/img/lamborghini2.avif"
    },
    {
        name: "BMW i8",
        brand: "bmw",
        price: "₹3.6 Cr",
        image: "/assets/img/bmw.avif"
    },
    {
        name: "Rolls Royce Ghost",
        brand: "rr",
        price: "₹8.1 Cr",
        image: "/assets/img/rr.webp"
    },
    {
        name: "Rolls Royce Phantom",
        brand: "rr",
        price: "₹9 Cr",
        image: "/assets/img/rr2.webp"
    }
];

function displayCars(filteredCars) {
    let html = "";

    if (filteredCars.length === 0) {
        carsContainer.innerHTML = `<div class="empty">No cars found 🚫</div>`;
        return;
    }

    filteredCars.forEach(car => {
        html += `
        <div class="car-card">
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p>Brand: ${car.brand}</p>
            <div class="price">${car.price}</div>
            <button class="btn">View Details</button>
        </div>
        `;
    });

    carsContainer.innerHTML = html;
}

function filterCars() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;

    const filtered = cars.filter(car => {
        const matchName = car.name.toLowerCase().includes(searchValue);
        const matchBrand = selectedBrand === "all" || car.brand === selectedBrand;
        return matchName && matchBrand;
    });

    displayCars(filtered);
}

searchInput.addEventListener("keyup", filterCars);
brandFilter.addEventListener("change", filterCars);

displayCars(cars);