function updateUI(data) {

    document.getElementById("cityName").textContent = data.city;

    document.getElementById("temperature").textContent =
        Math.round(data.weather.main.temp) + " °C";

    document.getElementById("humidity").textContent =
        data.weather.main.humidity + " %";

    document.getElementById("weather").textContent =
        data.weather.weather[0].main;

    document.getElementById("wind").textContent =
        data.weather.wind.speed + " m/s";

    // AQI
    const aqi = data.air.list[0].main.aqi;

  const aqiCard = document.getElementById("aqiCard");

const aqiLevels = {
    1: { text: "🟢 Good", color: "#4CAF50" },
    2: { text: "🟡 Fair", color: "#FFC107" },
    3: { text: "🟠 Moderate", color: "#FF9800" },
    4: { text: "🔴 Poor", color: "#F44336" },
    5: { text: "🟣 Very Poor", color: "#9C27B0" }
};

document.getElementById("aqi").textContent = aqiLevels[aqi].text;
aqiCard.style.backgroundColor = aqiLevels[aqi].color;
aqiCard.style.color = "white";

    // Weather Icon
    const iconCode = data.weather.weather[0].icon;

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Update Map
    updateMap(
        data.weather.coord.lat,
        data.weather.coord.lon,
        data.city,
        Math.round(data.weather.main.temp)
    );
}