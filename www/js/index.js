
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

var locationClick, locationPerson

locationPerson = new L.LayerGroup();
locationClick = new L.LayerGroup();

map = new L.Map('map', {layers: [locationClick, locationPerson]});

L.Browser.retina = true;

  L.zoomTMSLayer({
    url:            'http://{s}.tiles.mapbox.com/v3/bobbysud.map-tyt3admo/',
    layername :     '',
    serviceVersion: '',
    tileMaxZoom:    17,
    maxZoom:        18,
    tms:            false,
    zoomControl: false,
    reuseTiles: true, //Panning is sticky if false
    updateWhenIdle: false, //Loads tiles during pan
    unloadInvisibleTiles: true, //slows down app is false
    detectRetina:true,
  }).addTo(map);

    function onLocationFound(e) {

        lat = e.latlng.lat.toFixed(5);
        lng = e.latlng.lng.toFixed(5);
        latlng = +lat + ',' + lng;

        url = "http://maps.apple.com/maps?q="+latlng + "&ll=" + latlng+"&z=18";
        message = $(url).html();

        markerLocation = new L.LatLng(e.latlng.lat, e.latlng.lng);
        marker = new L.Marker(markerLocation, {draggable:true});

        locationPerson.clearLayers();
        locationPerson.addLayer(marker);

        marker.bindPopup("<a href='#one' input onclick='ComposeSMSme();'/><h3 id='sent' style='color:black;text-decoration:none;'>Text Your Location ►</h3></a>")
            .openPopup()
        }

        function onLocationError(e) {
            map.setView(new L.LatLng(37.76718664006672, -122.42511749267578), 13);
            navigator.notification.alert("Please make sure your location services area enabled.");
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({
            setView: true,
            maxZoom: 16,
            enableHighAccuracy: true,
        });

    function onMapClick(e) {

        lat = e.latlng.lat.toFixed(5);
        lng = e.latlng.lng.toFixed(5);
        latlng = +lat + ',' + lng;

        url = "http://maps.apple.com/maps?q="+latlng + "&ll=" + latlng+"&z=18";

        message = $(url).html();

        markerLocation = new L.LatLng(e.latlng.lat, e.latlng.lng);
        marker = new L.Marker(markerLocation, {draggable: true});

        locationClick.clearLayers();
        locationClick.addLayer(marker);

        marker.bindPopup("<a href='#one'input onclick='ComposeSMS();'/><h3 id='sent' style='color:black;text-decoration:none;'>Text This Location ►</h3></a>")
        .openPopup();

        elem = document.getElementById('sentbox').innerHTML = "<h3 style='text-align:center;font-color:#00CC33;'></h3>";

    };

    map.on('click', onMapClick);
  
//Geolocate    
    var geolocate = document.getElementById('geolocate');

    geolocate.onclick = function () {

        function onLocationFound(e) {

        lat = e.latlng.lat.toFixed(5);
        lng = e.latlng.lng.toFixed(5);
        latlng = +lat + ',' + lng;
        url = "http://maps.apple.com/maps?q="+latlng + "&ll=" + latlng+"&z=18";
        message = $(url).html();
        markerLocation = new L.LatLng(e.latlng.lat, e.latlng.lng);
        marker = new L.Marker(markerLocation, {draggable:true});
        locationPerson.clearLayers();
        locationPerson.addLayer(marker);
        marker.bindPopup("<a href='#one' input onclick='ComposeSMSme();'/><h3 id='sent' style='color:black;text-decoration:none;'>Text Your Location ►</h3></a>")
            .openPopup()
        }

        function onLocationError(e) {
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({
            setView: true,
            maxZoom: 16,
            enableHighAccuracy: true,
        });
    }

     var bingGeocoder = new L.Control.BingGeocoder('AmFJ03ozVugKu0Y_uijzwvFEKfKY5VCesm1eiBqGhchxQ3uKFUQMYsKJLNdfHsIR');
        map.addControl(bingGeocoder);

}; //Device on onDeviceReady


//SMS for onclick event
var ComposeSMS = function () {
    messageTwo = "Let's meet here.\n\n"+url;
    window.plugins.smsComposer.showSMSComposerWithCB(myCallback,'', messageTwo);
    console.log(messageTwo);
}

//SMS for your location
var ComposeSMSme = function () {
    messageTwo = "I'm right here.\n\n" + url;
    window.plugins.smsComposer.showSMSComposerWithCB(myCallback,'', messageTwo);
    console.log(messageTwo);
}

var myCallback = function(result){

    if(result == 0)
        console.log("cancelled");

    else if(result == 1)
        elem = document.getElementById('sent').innerHTML = "<a href='#one'/><h3 id='sent' style='color:black;text-decoration:none;text-align:center;margin:5px'>Location Sent!</h3></a>";
};


