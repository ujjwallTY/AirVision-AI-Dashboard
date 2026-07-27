window.onload = () => {
    getWeather("Delhi");
};

const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
function searchCity() {

    const city = input.value.trim();

    if (!city) {
        alert("Please enter a city.");
        input.focus();
        return;
    }

    getWeather(city);

    input.value = "";
    input.focus();
}

button.addEventListener("click", searchCity);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchCity();
    }
});
locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {

                const response = await fetch(
                    `http://localhost:3000/api/location/${lat}/${lon}`
                );

                const data = await response.json();

                updateUI(data);

            } catch (error) {

                console.error(error);

                alert("Unable to fetch your location.");

            }

        },

        () => {
            alert("Location permission denied.");
        }

    );

});