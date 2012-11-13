function runMap() {
    
    var map = L.map('map', {scrollWheelZoom: false});
    var marker;

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

        function onLocationFound(e) {
            L.circle(e.latlng).addTo(map);
        }

        function onLocationError(e) {
           map.setView([37.7854,-122.4236], 15);
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({setView: true, maxZoom: 17});


    var bingGeocoder = new L.Control.BingGeocoder('AmFJ03ozVugKu0Y_uijzwvFEKfKY5VCesm1eiBqGhchxQ3uKFUQMYsKJLNdfHsIR');

    var hash = new L.Hash();

    function onMapClick(e) {
        var zoom = map.getZoom();
        
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
        
        var latlngURL = '#' + zoom + '/' + e.latlng.lat.toFixed(3) + '/' + e.latlng.lng.toFixed(3);
      
        var latlngStr = "http://maps.apple.com/?q="+e.latlng.lat.toFixed(20) + ',' + e.latlng.lng.toFixed(20);

        get_short_url(latlngStr, login, api_key, function(short_url) {
            console.log(short_url);
        
        latlngMessage = ""+short_url+"\n Sent via MeatText.com";

        var marker = new L.marker(e.latlng, {draggable: true})
        	.addTo(map)
        	.bindPopup("<form method='post' id=payment action='assets/text/sms.php'><fieldset><ol><li><label for=name></label><input id=name name=to type=text placeholder='To?' required autofocus></li><li><label for=name></label><input id=name name=from type=text placeholder='From?' required autofocus></li><li><label for=phone></label><input id=phone name=phone type=tel placeholder='Their Phone #?' required></li><li id=location><textarea id=location name=location rows=2 required>" + latlngMessage + "</textarea></li><li id=url><textarea id=url name=url rows=2 required>" + latlngURL + "</textarea></li><li><textarea id=notes name=notes rows=1 required>Lets meet here!</textarea></li></ol></fieldset><fieldset><button type=submit id=submit>Send</button></fieldset></form>").openPopup()

        });

    }

    map.on('click', onMapClick);

    hash.init(map);

    map.addControl(bingGeocoder);

};


window.onload = runMap;