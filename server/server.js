const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("🌍 Air Quality Dashboard Backend Running!");
});

// Health Check API
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Backend Connected Successfully!",
        version: "1.0.0"
    });
});

// Weather API
app.get("/api/weather/:city", async (req, res) => {
    try {
        const city = req.params.city;

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );

        res.json(response.data);

    } catch (error) {
        console.log("Weather API Error:");
        console.log(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch weather data",
            error: error.response?.data || error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.get("/api/air/:city", async (req, res) => {
    try {
        const city = req.params.city;

        // Get city coordinates
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
        );

        const { lat, lon } = weatherResponse.data.coord;

        // Get Air Pollution Data
        const airResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
        );

        res.json(airResponse.data);

    } catch (error) {
        console.log(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch AQI data"
        });
    }
});
app.get("/api/dashboard/:city", async (req, res) => {
    try {
        const city = req.params.city;

        // Weather
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );

        const { lat, lon } = weatherResponse.data.coord;

        // Air Quality
        const airResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
        );

        res.json({
            city: weatherResponse.data.name,
            weather: weatherResponse.data,
            air: airResponse.data
        });

    } catch (error) {
        console.log(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Unable to load dashboard"
        });
    }
});
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});