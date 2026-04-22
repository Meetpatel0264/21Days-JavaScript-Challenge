const themeBtn = document.getElementById("themeBtn");

// THEME LOAD
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  updateIcon(true);
}

// TOGGLE THEME
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  updateIcon(isDark);
});

// ICON CHANGE
function updateIcon(isDark) {
  if (isDark) {
    themeBtn.innerText = "☀️";
    themeBtn.classList.remove("btn-dark");
    themeBtn.classList.add("btn-light");
  } else {
    themeBtn.innerText = "🌙";
    themeBtn.classList.remove("btn-light");
    themeBtn.classList.add("btn-dark");
  }
}

/* 🔥 AUTO CLOSE MENU ON CLICK */
const menuLinks = document.querySelectorAll(".offcanvas-body li");
const offcanvasEl = document.getElementById("menu");
const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    bsOffcanvas.hide();
  });
});