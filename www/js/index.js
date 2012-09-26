document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {


    var map = L.map('map').setView([51.505, -0.09], 13);

    var cloudmade = L.tileLayer('http://a.tiles.mapbox.com/v3/bobbysud.map-tyt3admo/{z}/{x}/{y}.png', {
        zoomControl: false,
        detectRetina: true,
        maxZoom: 17,
    }).addTo(map);

    var marker = L.marker([0, 0]).addTo(map);


        function onMapClick(e) {
           L.marker(e.latlng).addTo(map)
            .bindPopup("<a href='#two' data-transition='slidefade' /><h4 style='color:black;'>Text Location</h4></a>").openPopup()
            .clearLayers();
            popup.removeLayer();
        };

        map.on('click', onMapClick);

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

  var args;

}; //Device on onDeviceReady
