document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {


    var map = L.map('map')
        .setView([51.505, - 0.09], 13);

    var cloudmade = L.tileLayer('http://a.tiles.mapbox.com/v3/bobbysud.map-tyt3admo/{z}/{x}/{y}.png', {
        zoomControl: false,
        detectRetina: true,
        maxZoom: 17,
    })
        .addTo(map);

    var marker = L.marker([0, 0])
        .addTo(map);

    function onMapClick(e) {

        var lat = e.latlng.lat.toFixed(5);
        var lng = e.latlng.lng.toFixed(5);
        var latlng = +lat + ',' + lng;

        ok = " http://maps.apple.com/maps?spn=" + latlng;
        message = $(ok).html();


        L.marker(e.latlng, {draggable: true})
            .addTo(map)
            .bindPopup("<a href='#two'/><h2 style='color:black;text-decoration:none;'>Text Location ►</h2></a>")
            .openPopup()
            .clearLayers();
        popup.removeLayer();
    };

    map.on('click', onMapClick);

//Geolocate    
    var geolocate = document.getElementById('geolocate');

    geolocate.onclick = function () {

        function onLocationFound(e) {

            L.marker(e.latlng)
                .addTo(map)
        }

        function onLocationError(e) {
            alert(e.message);
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({
            setView: true,
            maxZoom: 16,
            enableHighAccuracy: true
        });
    }


}; //Device on onDeviceReady


//SMS
var ComposeSMS = function () {
    contents = $("#name")
        .val();
    messageTwo = contents + ok;
    console.log(messageTwo);
    window.plugins.smsComposer.showSMSComposer('', messageTwo);
};


