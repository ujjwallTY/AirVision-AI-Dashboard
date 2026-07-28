console.count("updateUI");
let currentWeatherData = null;

function updateUI(data) {

    currentWeatherData = data;
    
    document.getElementById("cityName").textContent = data.city;

    document.getElementById("temperature").textContent =
        Math.round(data.weather.main.temp) + " °C";

    document.getElementById("humidity").textContent =
        data.weather.main.humidity + " %";

    document.getElementById("weather").textContent =
        data.weather.weather[0].main;

    document.getElementById("wind").textContent =
        data.weather.wind.speed + " m/s";

    

    const aqi = data.air.list[0].main.aqi;

    const aqiLevels = {
        1: {
            text: "🟢 Good",
            color: "#4CAF50",
            advice: "Air quality is excellent. Perfect day for outdoor activities."
        },

        2: {
            text: "🟡 Fair",
            color: "#FFC107",
            advice: "Air quality is fair. Most people can safely enjoy outdoor activities."
        },

        3: {
            text: "🟠 Moderate",
            color: "#FF9800",
            advice: "Sensitive individuals should limit prolonged outdoor exercise."
        },

        4: {
            text: "🔴 Poor",
            color: "#F44336",
            advice: "Wear a mask and avoid unnecessary outdoor activities."
        },

        5: {
            text: "🟣 Very Poor",
            color: "#9C27B0",
            advice: "Stay indoors whenever possible and avoid strenuous outdoor activity."
        }
    };

    const currentAQI = aqiLevels[aqi];
const gauge = document.getElementById("gaugeFill");

gauge.style.background = currentAQI.color;
    document.getElementById("aqi").textContent = currentAQI.text;

    const aqiCard = document.getElementById("aqiCard");

    aqiCard.style.backgroundColor = currentAQI.color;
    aqiCard.style.color = "white";

    document.getElementById("aiAdvice").textContent =
        "🤖 " + currentAQI.advice;



const components = data.air.list[0].components;

document.getElementById("pm25").textContent = components.pm2_5 + " µg/m³";
document.getElementById("pm10").textContent = components.pm10 + " µg/m³";
document.getElementById("co").textContent = components.co + " µg/m³";
document.getElementById("no2").textContent = components.no2 + " µg/m³";
document.getElementById("so2").textContent = components.so2 + " µg/m³";
document.getElementById("o3").textContent = components.o3 + " µg/m³";
   

    const iconCode = data.weather.weather[0].icon;
const weatherType = data.weather.weather[0].main.toLowerCase();

document.body.className = "";

if (weatherType.includes("clear")) {

    document.body.classList.add("sunny");

}
else if (weatherType.includes("cloud")) {

    document.body.classList.add("cloudy");

}
else if (weatherType.includes("rain")) {

    document.body.classList.add("rainy");

}
else if (weatherType.includes("snow")) {

    document.body.classList.add("snowy");

}
else {

    document.body.classList.add("default-bg");

}


if (iconCode.endsWith("n")) {

    document.body.className = "night";

}
    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;



document.getElementById("pm25").textContent = components.pm2_5 + " µg/m³";

document.getElementById("pm10").textContent = components.pm10 + " µg/m³";

document.getElementById("co").textContent = components.co + " μg/m³";

document.getElementById("no2").textContent = components.no2 + " μg/m³";

document.getElementById("so2").textContent = components.so2 + " μg/m³";

document.getElementById("o3").textContent = components.o3 + " μg/m³";
     updateMap(
        data.weather.coord.lat,
        data.weather.coord.lon,
        data.city,
        Math.round(data.weather.main.temp)
    );

document.getElementById("sunrise").textContent =
    new Date(data.weather.sys.sunrise * 1000)
        .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

document.getElementById("sunset").textContent =
    new Date(data.weather.sys.sunset * 1000)
        .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

document.getElementById("visibility").textContent =
    (data.weather.visibility / 1000).toFixed(1) + " km";

document.getElementById("feelsLike").textContent =
    Math.round(data.weather.main.feels_like) + " °C";
   updateCharts(
    Math.round(data.weather.main.temp),
    data.air.list[0].main.aqi,
    data.city
);

loadForecast(data.city);

}