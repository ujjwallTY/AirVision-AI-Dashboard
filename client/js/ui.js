function updateUI(data) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = Math.round(data.main.temp) + " °C";
    document.getElementById("humidity").textContent = data.main.humidity + " %";
    document.getElementById("weather").textContent = data.weather[0].main;
    document.getElementById("wind").textContent = data.wind.speed + " m/s";
}