// Create the map
const map = L.map("map").setView([22.9734, 78.6569], 5);

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Marker variable
let marker = null;

// Function to update map
function updateMap(lat, lon, city, temp) {

    map.setView([lat, lon], 10);

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([lat, lon]).addTo(map);

    marker.bindPopup(`
        <b>${city}</b><br>
        🌡️ ${temp} °C
    `).openPopup();
}