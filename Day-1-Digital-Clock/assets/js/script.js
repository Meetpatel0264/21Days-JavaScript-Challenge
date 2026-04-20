let alarmTime = null;

function updateClock() {
  const now = new Date();

  let h = now.getHours();    
  let m = now.getMinutes();
  let s = now.getSeconds();

  let greet = "";
  if (h < 12) greet = "Good Morning ";
  else if (h < 18) greet = "Good Afternoon ";
  else greet = "Good Evening ";

  document.getElementById("greet").innerText = greet;

  let displayH = h % 12 || 12;
  let ampm = h >= 12 ? "PM" : "AM";

  displayH = displayH < 10 ? "0" + displayH : displayH;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  document.getElementById("time").innerText =
    `${displayH}:${m}:${s} ${ampm}`;

  document.getElementById("date").innerText =
    now.toDateString();

  document.getElementById("zones").innerHTML =
    `🌍 India: ${new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })}<br>
     🇺🇸 NY: ${new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" })}<br>
     London: ${new Date().toLocaleTimeString("en-US", { timeZone: "Europe/London" })}`;

  let hours24 = h < 10 ? "0" + h : h;

  if (alarmTime === `${hours24}:${m}` && s === "00") {
    playAlarm();
    alarmTime = null;
  }
}

setInterval(updateClock, 1000);
updateClock();


function setAlarm() {
  const input = document.getElementById("alarmInput").value;

  if (!input) {
    alert("Please select time!");
    return;
  }

  alarmTime = input;
  alert("✅ Alarm set for " + alarmTime);

  alarmInput.value = "";
}


const btn = document.getElementById("themeBtn");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  let mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});

function playAlarm() {
  const audio = document.getElementById("alarmSound");

  audio.currentTime = 0;
  audio.play().catch(() => {
    console.log("User interaction required to play sound");
  });
}

function stopAlarm() {
  const audio = document.getElementById("alarmSound");
  audio.pause();
  audio.currentTime = 0;
}


window.onload = () => {
  let saved = localStorage.getItem("theme");
  if (saved) {
    document.body.className = saved;
  }
};