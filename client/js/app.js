const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");

async function getWeather(city) {

    try {

        const response = await fetch(`http://localhost:3000/api/weather/${city}`);

        const result = await response.json();

        if (result.success) {
            updateUI(result.data);
        } else {
            alert(result.message);
        }

    } catch (error) {

        console.log(error);

    }

}

button.addEventListener("click", () => {

    const city = input.value.trim();

    if (city !== "") {
        getWeather(city);
    }

});

window.onload = () => {
    getWeather("Delhi");
};