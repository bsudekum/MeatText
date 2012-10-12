document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.splashscreen.hide()


    var map = L.map('map')
        .setView([37.76718664006672, -122.42511749267578], 13);

    var cloudmade = L.tileLayer('http://a.tiles.mapbox.com/v3/bobbysud.map-tyt3admo/{z}/{x}/{y}.png', {
        zoomControl: false,
        detectRetina: true,
        maxZoom: 17,
    })
        .addTo(map);


    function onMapClick(e) {

        var lat = e.latlng.lat.toFixed(5);
        var lng = e.latlng.lng.toFixed(5);
        latlng = +lat + ',' + lng;

        url = " http://maps.apple.com/maps?q="+latlng + "&ll=" + latlng+"&z=18";
        message = $(url).html();

        L.marker(e.latlng, {draggable: true})
            .addTo(map)
            .bindPopup("<a href='#two'/><h3 id='sent' style='color:black;text-decoration:none;'>Text This Location ►</h3></a>")
            .openPopup()

            elem = document.getElementById('sentbox').innerHTML = "<h3 style='text-align:center;font-color:#00CC33;'></h3>";

  
    };

    map.on('click', onMapClick);

//Geolocate    
    var geolocate = document.getElementById('geolocate');

    geolocate.onclick = function () {

        function onLocationFound(e) {

            L.marker(e.latlng)
            .addTo(map).addTo(map)
           
        }

        function onLocationError(e) {
            alert(e.message);
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({
            setView: true,
            maxZoom: 17,
            enableHighAccuracy: true
        });
    }

     var bingGeocoder = new L.Control.BingGeocoder('AmFJ03ozVugKu0Y_uijzwvFEKfKY5VCesm1eiBqGhchxQ3uKFUQMYsKJLNdfHsIR');

        map.addControl(bingGeocoder);

}; //Device on onDeviceReady


//SMS
var ComposeSMS = function () {
    contents = $("#name").val();
    messageTwo = contents + url;
    console.log(messageTwo);
    window.plugins.smsComposer.showSMSComposerWithCB(myCallback,'', messageTwo);
}

var myCallback = function(result){
    if(result == 1)

        elem = document.getElementById('sentbox').innerHTML = "<h3 style='text-align:center;font-color:#00CC33;'>Location Sent!</h3>";

        elem = document.getElementById('sent').innerHTML = "<a href='#two'/><h3 id='sent' style='color:black;text-decoration:none;text-align:center;margin:5px'>Location Sent!</h3></a>";
};


