const headerBtn = document.getElementById("headerBtn");
const cardToggle = document.getElementById("cardToggle");
const themeText = document.getElementById("themeText");
const cardIcon = document.getElementById("cardIcon");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    cardToggle.checked = true;
    updateUI(true);
}

function toggleTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    cardToggle.checked = isDark;
    updateUI(isDark);
}

headerBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme");
    toggleTheme(isDark);
});

cardToggle.addEventListener("change", () => {
    toggleTheme(cardToggle.checked);
});

function updateUI(isDark) {
    const favicon = document.getElementById("favicon");
    if (isDark) {
        themeText.innerText = "🌙 Dark Theme Active";
        headerBtn.innerText = "☀️";
        headerBtn.classList.remove("btn-dark");
        headerBtn.classList.add("btn-light");
        cardIcon.innerText = "☀️";
        favicon.href = "./assets/images/dark.jpg";
    } else {
        themeText.innerText = "☀️ Light Theme Active";
        headerBtn.innerText = "🌙";
        headerBtn.classList.remove("btn-light");
        headerBtn.classList.add("btn-dark");
        cardIcon.innerText = "🌙";
        favicon.href = "./assets/images/light.jpg";
    }
}