const API_BASE_URL = "http://localhost:3000";

const stateToCity = {
    "uttarakhand": "Dehradun",
    "himachal pradesh": "Shimla",
    "punjab": "Chandigarh",
    "haryana": "Chandigarh",
    "rajasthan": "Jaipur",
    "uttar pradesh": "Lucknow",
    "madhya pradesh": "Bhopal",
    "gujarat": "Ahmedabad",
    "maharashtra": "Mumbai",
    "bihar": "Patna",
    "jharkhand": "Ranchi",
    "chhattisgarh": "Raipur",
    "odisha": "Bhubaneswar",
    "west bengal": "Kolkata",
    "assam": "Guwahati",
    "manipur": "Imphal",
    "meghalaya": "Shillong",
    "mizoram": "Aizawl",
    "nagaland": "Kohima",
    "tripura": "Agartala",
    "sikkim": "Gangtok",
    "arunachal pradesh": "Itanagar",
    "telangana": "Hyderabad",
    "andhra pradesh": "Amaravati",
    "karnataka": "Bengaluru",
    "kerala": "Thiruvananthapuram",
    "tamil nadu": "Chennai",
    "goa": "Panaji"
};

// Weather
async function getWeather(city = "Delhi") {

    city = city.trim();

    const searchKey = city.toLowerCase();

    if (stateToCity[searchKey]) {
        city = stateToCity[searchKey];
        console.log(`Searching for ${city} instead of ${searchKey}`);
    }

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/dashboard/${encodeURIComponent(city)}`
        );

        if (!response.ok) {
            throw new Error(
                "City not found. Try Delhi, Mumbai, Shimla, etc."
            );
        }

        const data = await response.json();

        updateUI(data);

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// Forecast
async function getForecast(city) {

    const response = await fetch(
        `${API_BASE_URL}/api/forecast/${encodeURIComponent(city)}`
    );

    return await response.json();

}