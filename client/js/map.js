
const map = L.map("map").setView([22.9734, 78.6569], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 18
}).addTo(map);
let marker = null;
function updateMap(lat, lon, city, temp) {

    map.flyTo([lat, lon], 10, {
        animate: true,
        duration: 1.5
    });

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([lat, lon]).addTo(map);

    marker.bindPopup(`
        <div style="text-align:center;">
            <h3>${city}</h3>
            <p>🌡️ <strong>${temp} °C</strong></p>
        </div>
    `).openPopup();

}