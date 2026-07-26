window.onload = () => {
    getWeather("Delhi");
};

const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");

button.addEventListener("click", () => {
    const city = input.value.trim();

    if (!city) {
        alert("Please enter a city");
        return;
    }

    getWeather(city);
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather(input.value.trim());
    }
});