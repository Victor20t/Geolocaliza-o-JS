var h2 = document.querySelector('h2');
var map;

function success(pos){
    console.log(pos.coords.latitude, pos.coords.longitude);
    h2.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`;

    if (!map) {
        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
            .bindPopup('Localização ')
            .openPopup();
    } else {
        // Atualizar a visualização do mapa, se necessário
        map.setView([pos.coords.latitude, pos.coords.longitude], 13);
    }
}

function error(err){
    console.log(err);
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});
