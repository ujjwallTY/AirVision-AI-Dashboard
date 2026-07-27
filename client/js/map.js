// ==============================
// Initialize Map
// ==============================

const map = L.map("map").setView([22.9734, 78.6569], 5);

// OpenStreetMap Tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 18
}).addTo(map);

// Marker Variable
let marker = null;

// ==============================
// Update Map Function
// ==============================

function updateMap(lat, lon, city, temp) {

    // Smooth animation while moving
    map.flyTo([lat, lon], 10, {
        animate: true,
        duration: 1.5
    });

    // Remove old marker
    if (marker) {
        map.removeLayer(marker);
    }

    // Add new marker
    marker = L.marker([lat, lon]).addTo(map);

    marker.bindPopup(`
        <div style="text-align:center;">
            <h3>${city}</h3>
            <p>🌡️ <strong>${temp} °C</strong></p>
        </div>
    `).openPopup();

}