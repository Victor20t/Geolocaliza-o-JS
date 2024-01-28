var h2 = document.querySelector('h2');
var map;

function success(pos) {
    console.log(pos.coords.latitude, pos.coords.longitude);
    h2.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`;

    if (!map) {
        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 8);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Adiciona um polígono representando o estado de Pernambuco
        var pernambucoCoords = [
            [-8.472372, -37.946777], // Recife
            // Adicione mais pontos conforme necessário para definir a forma do estado
        ];

        L.polygon(pernambucoCoords, { color: 'blue' }).addTo(map);

            fetch('dados.geojson')
            .then(response => response.json())
            .then(data => {
                L.geoJSON(data, { color: 'red' }).addTo(map);
            });

    } else {
        // Atualizar a visualização do mapa, se necessário
        map.setView([pos.coords.latitude, pos.coords.longitude], 6);
    }
}

function error(err) {
    console.log(err);
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});


