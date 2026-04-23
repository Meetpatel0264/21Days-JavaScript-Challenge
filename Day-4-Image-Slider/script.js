const images = [
    "https://picsum.photos/id/1015/800/500",
    "https://picsum.photos/id/1016/800/500",
    "https://picsum.photos/id/1025/800/500",
    "https://picsum.photos/id/1018/800/500",
    "https://picsum.photos/id/1020/800/500",
    "https://picsum.photos/id/1021/800/500",
    "https://picsum.photos/id/1022/800/500",
    "https://picsum.photos/id/1023/800/500",
    "https://picsum.photos/id/1024/800/500",
    "https://picsum.photos/id/1029/800/500"
];

let index = 0;

const img = document.getElementById("slider-img");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const dotsContainer = document.getElementById("dots");
const counter = document.getElementById("counter");

images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
        index = i;
        showImage();
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");

function showImage() {
    img.style.opacity = 0;

    setTimeout(() => {
        img.src = images[index];
        img.style.opacity = 1;
        updateDots();
        updateCounter();
    }, 200);
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

function updateCounter() {
    counter.innerText = `${index + 1} / ${images.length}`;
}

showImage();

next.addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage();
});

prev.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showImage();
});

let interval;

function startAutoSlide() {
    interval = setInterval(() => {
        index = (index + 1) % images.length;
        showImage();
    }, 1000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

const slider = document.querySelector(".slider");

slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

startAutoSlide();

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    index = (index + 1) % images.length;
    showImage();
  } 
  else if (e.key === "ArrowLeft") {
    index = (index - 1 + images.length) % images.length;
    showImage();
  }
});

