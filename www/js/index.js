
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

$("img[src*='dot.png']").css('opacity','1');

var personIcon = L.icon({
            iconUrl: 'img/dot.png',
            iconSize: [31, 31],
            iconAnchor: [16, 16],
            popupAnchor: [0, -6]
        });

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({
            setView: true,
            maxZoom: 16,
            enableHighAccuracy: true,
        });

        new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.Google()
        }).addTo(map);
    

}; //Device on onDeviceReady 



//Email for onclick event
var emailComposer = function () {

    $(".icon-envelope-alt").addClass("icon-spin");

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

    messageTwo = "Let's meet here. "+placeAddress+"\n\n"+short_url+"\n\n\n\n Sent via MeatText.com";

    window.plugins.emailComposer.showEmailComposerWithCB(myCallbackEmail,"Let's meet here.",messageTwo,"","","");
    console.log(messageTwo);

    $(".icon-envelope-alt").removeClass("icon-spin");

    });
}

//Copy
var copyText = function(){

    $(".icon-link").addClass("icon-spin");

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

    messageTwo = ""+short_url;

    window.plugins.clipboardPlugin.setText(""+placeAddress+"\n\n"+short_url)
    navigator.notification.alert("", null, "Location Copied", "Okay");
    console.log(messageTwo);
    
    $(".icon-link").removeClass("icon-spin");


    });
}


//SMS for onclick event
var ComposeSMS = function () {

    $(".icon-comments").addClass("icon-spin");

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
    
    messageTwo = "Let's meet here. "+placeAddress+"\n\n"+short_url;

    //Althought this is not ideal, there are many errors that are happening without a small amount of 'buffer' time.
    setTimeout(function(){
        window.plugins.smsComposer.showSMSComposerWithCB(myCallback,'', messageTwo);
        $(".icon-comments").removeClass("icon-spin");
    },500)
    
    

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

    $(".icon-twitter").addClass("icon-spin");

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
    
    messageTwo = "Let's meet here. "+placeAddress+"\n\n"+short_url;


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

    $(".icon-twitter").removeClass("icon-spin");


    console.log(messageTwo);
    });
}

  
    
