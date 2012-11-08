
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

        lat = e.latlng.lat.toFixed(7);
        lng = e.latlng.lng.toFixed(7);
        latlng = +lat + ',' + lng;
        url = "http://maps.apple.com/maps?q="+latlng;
        message = $(url)
        markerLocation = new L.LatLng(e.latlng.lat, e.latlng.lng);
        marker = new L.Marker(markerLocation, {draggable:true});
        locationPerson.clearLayers();
        locationPerson.addLayer(marker);
        marker.bindPopup("<a href='#one'/><p id='sent' style='color:black;text-decoration:none;'>Text Your Location ►</p></a>")
            .openPopup()
            $("#sent").click(function(){
                $("#panel").slideToggle("fast");
            });
        }

        function onLocationError(e) {
            map.setView(new L.LatLng(37.76718664006672, -122.42511749267578), 14);
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

        lat = e.latlng.lat.toFixed(7);
        lng = e.latlng.lng.toFixed(7);
        latlng =lat+ ',' + lng;
        url = "http://maps.apple.com/maps?q="+latlng;
        message = $(url)
        markerLocation = new L.LatLng(e.latlng.lat, e.latlng.lng);
        marker = new L.Marker(markerLocation, {draggable: true});
        locationClick.clearLayers();
        locationClick.addLayer(marker);
        marker.bindPopup("<a href='#one'/><p id='sent' style='color:black;text-decoration:none;'>Text This Location ►</p></a>")
        .openPopup();

         $("#sent").click(function(){
            $("#panel").slideToggle("fast");
        }); 
    };

    map.on('contextmenu', onMapClick);
  
//Geolocate    
    var geolocate = document.getElementById('geolocate');

    geolocate.onclick = function () {

        function onLocationFound(e) {

        lat = e.latlng.lat.toFixed(7);
        lng = e.latlng.lng.toFixed(7);
        latlng = +lat + ',' + lng;
        url = "http://maps.apple.com/maps?q="+latlng;
        message = $(url)
        markerLocation = new L.LatLng(e.latlng.lat, e.latlng.lng);
        marker = new L.Marker(markerLocation, {draggable:true});
        locationPerson.clearLayers();
        locationPerson.addLayer(marker);
        marker.bindPopup("<a href='#one' /><p id='sent' style='color:black;text-decoration:none;'>Text Your Location ►</p></a>")
            .openPopup()

            $("#sent").click(function(){
                $("#panel").slideToggle("fast");
            });
        };

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

     
    //Geocoder
     var bingGeocoder = new L.Control.BingGeocoder('AmFJ03ozVugKu0Y_uijzwvFEKfKY5VCesm1eiBqGhchxQ3uKFUQMYsKJLNdfHsIR');
        map.addControl(bingGeocoder);

    
}; //Device on onDeviceReady


//Copy
//Copy
//Copy

var copyLink = function () {
    function get_short_url(url, login, api_key, func)
    {
        $.getJSON(
            "http://api.bitly.com/v3/shorten?callback=?", 
            { 
                "format": "json",
                "apiKey": api_key,
                "login": login,
                "longUrl": url
            },
            function(response)
            {
                func(response.data.url);
            }
        );
    }
    var login = "o_7iuqro3rja";
    var api_key = "R_0e5b4318f72e53dfee13fb1491229204";
    get_short_url(url, login, api_key, function(short_url) {
        console.log(short_url);
    

    messageTwo = "Here is the location: "+short_url+"\n\n\n\n Sent via MeatText.com";
    window.plugins.clipboardPlugin.getText(function(messageTwo) {alert(messageTwo)})
    console.log(messageTwo);
    });
}





//Email for onclick event
var emailComposer = function () {
    function get_short_url(url, login, api_key, func)
    {
        $.getJSON(
            "http://api.bitly.com/v3/shorten?callback=?", 
            { 
                "format": "json",
                "apiKey": api_key,
                "login": login,
                "longUrl": url
            },
            function(response)
            {
                func(response.data.url);
            }
        );
    }
    var login = "o_7iuqro3rja";
    var api_key = "R_0e5b4318f72e53dfee13fb1491229204";
    get_short_url(url, login, api_key, function(short_url) {
        console.log(short_url);
    

    messageTwo = "Here is the location: "+short_url+"\n\n\n\n Sent via MeatText.com";
    window.plugins.emailComposer.showEmailComposer("Let's meet here!",messageTwo,"","","");
    console.log(messageTwo);
    });
}

//SMS for onclick event
var ComposeSMS = function () {
    function get_short_url(url, login, api_key, func)
    {
        $.getJSON(
            "http://api.bitly.com/v3/shorten?callback=?", 
            { 
                "format": "json",
                "apiKey": api_key,
                "login": login,
                "longUrl": url
            },
            function(response)
            {
                func(response.data.url);
            }
        );
    }
    var login = "o_7iuqro3rja";
    var api_key = "R_0e5b4318f72e53dfee13fb1491229204";
    get_short_url(url, login, api_key, function(short_url) {
        console.log(short_url);
    
    messageTwo = "Let's meet here.\n\n"+short_url;
    window.plugins.smsComposer.showSMSComposerWithCB(myCallback,'', messageTwo);
    console.log(messageTwo);
    });

}

//SMS for your location
var ComposeSMSme = function () {
    function get_short_url(url, login, api_key, func)
    {
        $.getJSON(
            "http://api.bitly.com/v3/shorten?callback=?", 
            { 
                "format": "json",
                "apiKey": api_key,
                "login": login,
                "longUrl": url
            },
            function(response)
            {
                func(response.data.url);
            }
        );
    }
    var login = "o_7iuqro3rja";
    var api_key = "R_0e5b4318f72e53dfee13fb1491229204";
    get_short_url(url, login, api_key, function(short_url) {
        console.log(short_url);
    
    messageTwo = "I'm right here.\n\n"+short_url;
    window.plugins.smsComposer.showSMSComposerWithCB(myCallback,'', messageTwo);
    console.log(messageTwo);
    });
}

var myCallback = function(result){

    if(result == 0)
        console.log("cancelled");

    else if(result == 1)
        elem = document.getElementById('sent').innerHTML = "<a href='#one'/><p id='sent' style='color:black;text-decoration:none;text-align:center;margin:5px'>Location Sent!</p></a>";
};


