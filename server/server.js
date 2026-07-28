require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    
    next();
});
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;


app.get("/", (req, res) => {
    res.send("🌍 AirVision Backend Running Successfully!");
});


app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        project: "AirVision",
        version: "1.0.0",
        status: "Running"
    });
});


app.get("/api/weather/:city", async (req, res) => {

    try {

        const city = req.params.city;

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        res.json(response.data);

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(404).json({
            success: false,
            message: "City not found"
        });

    }

});



app.get("/api/air/:city", async (req, res) => {

    try {

        const city = req.params.city;

        const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`
        );

        const { lat, lon } = weather.data.coord;

        const air = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        res.json(air.data);

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(404).json({
            success: false,
            message: "AQI data not available"
        });

    }

});



app.get("/api/dashboard/:city", async (req, res) => {

    try {

        const city = req.params.city;

        const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        const { lat, lon } = weather.data.coord;

        const air = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        res.json({
            city: weather.data.name,
            weather: weather.data,
            air: air.data
        });

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(404).json({
            success: false,
            message: "Unable to load dashboard."
        });

    }

});



app.get("/api/location/:lat/:lon", async (req, res) => {

    try {

        const { lat, lon } = req.params;

        const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const air = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        res.json({
            city: weather.data.name,
            weather: weather.data,
            air: air.data
        });

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch your location."
        });

    }

});
app.get("/api/forecast/:city", async (req, res) => {

    try {

        const city = req.params.city;

        const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        res.json(weather.data);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: "Forecast unavailable"
        });

    }

});
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});