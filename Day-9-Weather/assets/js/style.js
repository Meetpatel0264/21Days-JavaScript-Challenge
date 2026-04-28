
document.getElementById("btn").addEventListener("click", getWeather);

function resetWeather() {
    document.getElementById("cityDisplay").innerText = "---";
    document.getElementById("temp").innerText = "--°C";
    document.getElementById("humidity").innerText = "--%";
    document.getElementById("speed").innerText = "-- km/h";
    document.getElementById("minmax").innerText = "--°C / --°C";
    document.getElementById("icon").style.display = "none";
    document.getElementById("cityName").value = "";
}

async function getWeather() {
    const city = document.getElementById("cityName").value.trim();
    const apiKey = "024ced2b4c81550d546f502bbf3d8449";
    const API_Link = "https://api.openweathermap.org/data/2.5/weather";

    if (city === "") {
        alert("Please enter a city name!");
        resetWeather();
        return;
    }

    try {
        const response = await fetch(
            `${API_Link}?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (data.cod == 404) {
            resetWeather();
            alert("City not found!");
            return;
        }

        document.getElementById("cityDisplay").innerText =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temp").innerText =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("humidity").innerText =
            `${data.main.humidity}%`;

        document.getElementById("speed").innerText =
            `${data.wind.speed} km/h`;

        document.getElementById("minmax").innerText =
            `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        document.getElementById("icon").style.display = "block";

    } catch (error) {
        alert("Something went wrong!");
        resetWeather();
    }
}