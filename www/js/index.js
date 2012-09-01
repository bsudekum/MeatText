document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {


    var map = L.map('map').setView([51.505, -0.09], 13);

    var cloudmade = L.tileLayer('http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png', {
        zoomControl: false,
        detectRetina: true
    }).addTo(map);

    var marker = L.marker([51.5, -0.09]).addTo(map);


    var control = L.control.layers({CloudMade: cloudmade}, {marker: marker});
    control._map = map;
    var controlDiv = control.onAdd(map);


    var geolocate = document.getElementById('geolocate');

     geolocate.onclick = function() {

        function onLocationFound(e) {

            L.marker(e.latlng).addTo(map)}

        function onLocationError(e) {
            alert(e.message);
    }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({setView: true, maxZoom: 16, enableHighAccuracy: true});
    }

//     var args;

}; //Device on onDeviceReady