

function runMap() {
    
    var map = L.map('map', {scrollWheelZoom: false});
    var marker;

    if (screen.width >= 500) {

        marker= new L.LayerGroup();
         L.zoomTMSLayer({ 
            url:            'http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/',
            layername :     '',
            serviceVersion: '',
            tileMaxZoom:    17,
            maxZoom:        18,
            tms:            false,
            detectRetina:true,
          }).addTo(map);

    } else {

        marker= new L.LayerGroup();
         L.zoomTMSLayer({ 
            url:            'http://{s}.tiles.mapbox.com/v3/bobbysud.map-tyt3admo/',
            layername :     '',
            serviceVersion: '',
            tileMaxZoom:    17,
            maxZoom:        18,
            tms:            false,
            detectRetina:true,
          }).addTo(map);

    }



        function onLocationFound(e) {

        var latlngStr = "http://maps.apple.com/?q="+e.latlng.lat.toFixed(20) + ',' + e.latlng.lng.toFixed(20);

        get_short_url(latlngStr, login, api_key, function(short_url) {

            console.log(short_url); //Shortened URL
        
        latlngMessage = ""+short_url+"";

        var zoom = map.getZoom();
         
        var latlngURL = '#' + zoom + '/' + e.latlng.lat.toFixed(3) + '/' + e.latlng.lng.toFixed(3);
        
        var marker = new L.marker(e.latlng, {draggable: true})
            .addTo(map)
            .bindPopup("<div id='popupStuff' style='text-align:center;'><a class='texttoggle'><p>Text</p><img src='../img/chat.png' height='40px' width='50px'></a><a id='email' href='mailto:?subject=Here is the spot&body= Let us meet here.  "+latlngMessage+" %0D %0D %0D Sent to you via www.MeatText.com''><p>E-mail</p><img src='../img/email.png' height='65px' width='65px'></a><a  id='twitter' href='https://twitter.com/share?text=Here is the spot-&url="+latlngMessage+"' target='_blank' ><p>Tweet</p><img src='../img/twitter.png' height='65px' width='65px'></a><div id='panel'><form method='post' id=payment action='assets/text/sms.php' style='display:inherit'><fieldset><ol><li><label for=name></label><input id=name name=to type=text placeholder='To?' required autofocus></li><li><label for=name></label><input id=name name=from type=text placeholder='From?' required autofocus></li><li><label for=phone></label><input id=phone name=phone type=tel placeholder='Their Phone #?' required></li><li id=location><textarea id=location name=location rows=2 required>" + latlngMessage + "</textarea></li><li id=url><textarea id=url name=url rows=2 required>" + latlngURL + "</textarea></li><li><textarea id=notes name=notes rows=1 required>Let's meet here!</textarea></li></ol></fieldset><fieldset><button type=submit id=submit>Send</button></fieldset></form></div></div>").openPopup()

            $(".texttoggle").click(function () {
                $("#panel").slideToggle("slow");
            });

        });
            
        }

        function onLocationError(e) {
           map.setView([37.78882751574745668677,-122.40591287612913617977], 16);

           var marker = new L.marker([37.78882751574745668677,-122.40591287612913617977]).addTo(map).bindPopup("<h4 style='text-align:center;'>Click the map, choose how you want to send that location.</h4>").openPopup();
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({setView: true, maxZoom: 17});

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

    var bingGeocoder = new L.Control.BingGeocoder('AmFJ03ozVugKu0Y_uijzwvFEKfKY5VCesm1eiBqGhchxQ3uKFUQMYsKJLNdfHsIR');

    var hash = new L.Hash();



    function onMapClick(e) {

        var marker = new L.marker(e.latlng, {draggable: true}).addTo(map) //Without this, the marker is placed after the URL call happens. 

        var latlngStr = "http://maps.apple.com/?q="+e.latlng.lat.toFixed(20) + ',' + e.latlng.lng.toFixed(20);

        get_short_url(latlngStr, login, api_key, function(short_url) {

            console.log(short_url); //Shortened URL
        
        latlngMessage = ""+short_url+"";

        var zoom = map.getZoom();
         
        var latlngURL = '#' + zoom + '/' + e.latlng.lat.toFixed(3) + '/' + e.latlng.lng.toFixed(3);
        
        var marker = new L.marker(e.latlng, {draggable: true})
            .addTo(map)
            .bindPopup("<div id='popupStuff' style='text-align:center;'><a class='texttoggle' href='#'><p>Text</p><img src='../img/chat.png' height='40px' width='50px'></a><a id='email' href='mailto:?subject=Here is the spot&body= Let us meet here.  "+latlngMessage+" %0D %0D %0D Sent to you via www.MeatText.com''><p>E-mail</p><img src='../img/email.png' height='65px' width='65px'></a><a  id='twitter' href='https://twitter.com/share?text=Here is the spot-&url="+latlngMessage+"' target='_blank' ><p>Tweet</p><img src='../img/twitter.png' height='65px' width='65px'></a><div id='panel'><form id=payment  style='display:inherit'><fieldset><ol><li><label for=name></label><input id=name name=to type=text placeholder='To?' required autofocus></li><li><label for=name></label><input id=name name=from type=text placeholder='From?' required autofocus></li><li><label for=phone></label><input id=phone name=phone type=tel placeholder='Their Phone #?' required></li><li id=location><textarea id=location name=location rows=2 required>" + latlngMessage + "</textarea></li><li id=url><textarea id=url name=url rows=2 required>" + latlngURL + "</textarea></li><li><textarea id=notes name=notes rows=1 required>Let's meet here!</textarea></li></ol></fieldset><fieldset><button type=submit id=submit>Send</button></fieldset></form></div></div>").openPopup()

            $(".texttoggle").click(function () {
                $("#panel").slideToggle("slow");
            });
        });
    }

    


/*
    function onMapClick(e) {

         var marker = new L.marker(e.latlng, {draggable: true}).addTo(map) //Without this, the marker is placed after the URL call happens. 

        var latlngStr = "http://maps.apple.com/?q="+e.latlng.lat.toFixed(20) + ',' + e.latlng.lng.toFixed(20);

        get_short_url(latlngStr, login, api_key, function(short_url) {

            console.log(short_url); //Shortened URL
        
        latlngMessage = ""+short_url+"\n Sent via MeatText.com";

        var zoom = map.getZoom();
         
        var latlngURL = '#' + zoom + '/' + e.latlng.lat.toFixed(3) + '/' + e.latlng.lng.toFixed(3);
        
        var marker = new L.marker(e.latlng, {draggable: true})
            .addTo(map)
            .bindPopup("<form method='post' id=payment action='assets/text/sms.php'><fieldset><ol><li><label for=name></label><input id=name name=to type=text placeholder='To?' required autofocus></li><li><label for=name></label><input id=name name=from type=text placeholder='From?' required autofocus></li><li><label for=phone></label><input id=phone name=phone type=tel placeholder='Their Phone #?' required></li><li id=location><textarea id=location name=location rows=2 required>" + latlngMessage + "</textarea></li><li id=url><textarea id=url name=url rows=2 required>" + latlngURL + "</textarea></li><li><textarea id=notes name=notes rows=1 required>Let's meet here!</textarea></li></ol></fieldset><fieldset><button type=submit id=submit>Send</button></fieldset></form>").openPopup()

        });

    }*/

    map.on('click', onMapClick);

    hash.init(map);

    map.addControl(bingGeocoder);

};


window.onload = runMap;