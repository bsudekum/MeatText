
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

var personIcon = L.icon({
            iconUrl: 'img/dot.png',
            iconSize: [31, 31],
            iconAnchor: [16, 16],
            popupAnchor: [0, -6]
        });


var locationClick, locationPerson, vectorCircle, locationSearch;

locationPerson = new L.LayerGroup();
locationClick = new L.LayerGroup();
vectorCircle = new L.LayerGroup();
locationSearch = new L.LayerGroup();

map = new L.Map('map', {layers: [locationClick, locationPerson, vectorCircle, locationSearch]});

L.Browser.retina = true;


    var mapbox = L.zoomTMSLayer({ 
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

    var bingSat = L.zoomTMSLayer({ 
        url:            'http://{s}.tiles.mapbox.com/v3/bobbysud.map-zjt9pl97/',
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
    });

    var bingHybrid = L.zoomTMSLayer({ 
        url:            'http://{s}.tiles.mapbox.com/v3/bobbysud.map-ddwpawil/',
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
    });
    
/*
    var bingHybrid =  new L.bingHybrid("AmFJ03ozVugKu0Y_uijzwvFEKfKY5VCesm1eiBqGhchxQ3uKFUQMYsKJLNdfHsIR",{
        maxZoom:18,
        reuseTiles: true, //Panning is sticky if false
        updateWhenIdle: false, //Loads tiles during pan
        unloadInvisibleTiles: true, //slows down app is false
        detectRetina:true,
    });

   var bingSat =  new L.bingSat("AmFJ03ozVugKu0Y_uijzwvFEKfKY5VCesm1eiBqGhchxQ3uKFUQMYsKJLNdfHsIR",{
        maxZoom:18,
        reuseTiles: true, //Panning is sticky if false
        updateWhenIdle: false, //Loads tiles during pan
        unloadInvisibleTiles: true, //slows down app is false
        detectRetina:false,
    });   

*/
   $("#button1").click(function() {
        map.removeLayer(bingSat)
        map.removeLayer(bingHybrid);
        map.addLayer(mapbox)
        zoom = map.getZoom();
        if(zoom>17){
            map.zoomOut(1);
            map.maxZoom(17);
        }
    });

    $("#button2").click(function() {
        map.removeLayer(bingSat);
        map.removeLayer(mapbox);
        map.addLayer(bingHybrid)
    });

    $("#button3").click(function() {
        map.removeLayer(mapbox);
        map.removeLayer(bingHybrid);
        map.addLayer(bingSat)
    });

    function onLocationFound(e) {

        lat = e.latlng.lat.toFixed(7);
        lng = e.latlng.lng.toFixed(7);
        latlng = +lat + ',' + lng;
        url = "http://maps.apple.com/maps?q="+latlng;
        message = $(url)
        markerLocation = new L.LatLng(e.latlng.lat, e.latlng.lng,{icon: personIcon});
        marker = new L.Marker(markerLocation, {draggable: true,icon: personIcon});
        locationPerson.clearLayers();
        locationPerson.addLayer(marker);

        var radius = e.accuracy / 2;
       circleperson = new L.circle(e.latlng, radius,{color: "#3871B9", weight: 1.5,fillOpacity:0})
       vectorCircle.clearLayers();
       vectorCircle.addLayer(circleperson);

        marker.bindPopup("<a href='#one'/><p id='sent' onload='initFastButtons()' style='color:black;text-decoration:none;'>Share Location ➤</p></a>")
            .openPopup()

        }

        function onLocationError(e) {
            map.setView(new L.LatLng(37.76718664006672, -122.42511749267578), 14);
            navigator.notification.alert("It looks like your location settings are not enabled", null, "Oops!");
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
        marker.bindPopup("<a href='#one'/><p id='sent' onload='initFastButtons()' style='color:black;text-decoration:none;'>Share Location ➤</p></a>")
        .openPopup();

         
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
        markerLocation = new L.LatLng(e.latlng.lat, e.latlng.lng,{icon: personIcon});
        marker = new L.Marker(markerLocation, {draggable: true,icon: personIcon});
        locationPerson.clearLayers();
        locationPerson.addLayer(marker);
        
        var radius = e.accuracy / 2;
       circleperson = new L.circle(e.latlng, radius,{color: "#3871B9", weight: 1.5,fillOpacity:0})
       vectorCircle.clearLayers();
       vectorCircle.addLayer(circleperson);

        marker.bindPopup("<a href='#one' /><p id='sent' onload='initFastButtons()' style='color:black;text-decoration:none;'>Share Location ➤</p></a>")

            .openPopup()

            
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

        
      function resetSlide(e) {
            $("#sent").click(function(){
                $("#footer").slideToggle("fast");
                $("#settingsFooter").slideUp("fast");
            });
        };

    function dragDown(){
            $("#footer").slideUp("fast");
            $("#settingsFooter").slideUp("fast");
        };

    $("#settingsButton").click(function() {
        $("#settingsFooter").slideToggle("fast");
        $("#footer").slideUp("fast");
    });

    $("#buttonDown").click(function() {
        $("#footer").slideToggle("fast");
    });


    map.on("popupopen", resetSlide);
    map.on("move", dragDown);
    map.on("click", dragDown);



}; //Device on onDeviceReady



//Email for onclick event
var emailComposer = function () {
    $('#emailText img').attr('src','img/loading.gif');

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
    window.plugins.emailComposer.showEmailComposerWithCB(myCallbackEmail,"Let's meet here.",messageTwo,"","","");
    console.log(messageTwo);
    $('#emailText img').attr('src','img/email.png');
    });
}

//SMS for onclick event
var ComposeSMS = function () {
    $('#smsText img').attr('src','img/loading.gif');

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
        
        $('#smsText img').attr('src','img/chat.png');
    });

}

var myCallback = function(result){

    if(result == 0)
        console.log("cancelled");

    else if(result == 1)
        elem = document.getElementById('sent').innerHTML = "<a href='#one'/><p id='sent' style='color:black;text-decoration:none;text-align:center;margin:5px'>Location Sent!</p></a>";
};

var myCallbackEmail = function(result){

    if(result == 0)
        console.log("cancelled");

    else if(result == 2)
        elem = document.getElementById('sent').innerHTML = "<a href='#one'/><p id='sent' style='color:black;text-decoration:none;text-align:center;margin:5px'>Location Sent!</p></a>";
};

//Tweet for your location
var tweet = function () {
    $('#twitterText img').attr('src','img/loading.gif');
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
    
    messageTwo = "Here's the spot:\n"+short_url;


// is twitter setup? If not, tell the user to go do it
    window.plugins.twitter.isTwitterSetup(function(r) {
        if (r === 1) {
            // twitter is setup, compose a new tweet
              window.plugins.twitter.composeTweet(
                  function(s){elem = document.getElementById('sent').innerHTML = "<a href='#one'/><p id='sent' style='color:black;text-decoration:none;text-align:center;margin:5px'>Location Sent!</p></a>";},
                  function(e){console.log("Tweet Cancelled")}, 
                  ""+ messageTwo + "");
        } else {
        navigator.notification.alert("It looks like you haven't enabled Twitter.", null, "Oops!");
        }
    });


    console.log(messageTwo);
    $('#twitterText img').attr('src','img/twitter.png');
    });


}

  
    
