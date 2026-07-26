const API_BASE_URL = "http://localhost:3000";

async function getWeather(city = "Delhi") {
    try {
        const response = await fetch(`${API_BASE_URL}/api/dashboard/${city}`);

        if (!response.ok) {
            throw new Error("Unable to fetch dashboard data");
        }

        const data = await response.json();

        updateUI(data);

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}