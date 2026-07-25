const API_BASE_URL = "http://localhost:3000";

async function getWeather(city = "Delhi") {
    try {
        const response = await fetch(`${API_BASE_URL}/api/weather/${city}`);

        const data = await response.json();

        console.log("Weather Data:", data);

        updateUI(data);

    } catch (error) {
        console.error(error);
        alert("Unable to fetch weather data");
    }
}