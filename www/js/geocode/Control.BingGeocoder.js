L.Control.BingGeocoder = L.Control.extend({
    options: {
        collapsed: false,
        position: 'topright',
        text: '',
        callback: function (results) {
            var bbox = results.resourceSets[0].resources[0].bbox,
                first = new L.LatLng(bbox[0], bbox[1]),
                second = new L.LatLng(bbox[2], bbox[3]),
                bounds = new L.LatLngBounds([first, second]);
            this._map.fitBounds(bounds);

            // fetch the name of the geocoded location, which we will use in a Popup in a moment...
			var place = results.resourceSets[0].resources[0].name;
			console.log(place)

	
			setTimeout(function() {


					var searchPin = L.icon({
					            iconUrl: 'img/searchPin.png',
					            iconSize: [25, 41],
					            iconAnchor: [12, 41],
					            popupAnchor: [1, -34],
					            shadowUrl: 'img/marker-shadow.png',
					        });
			
  
					mymarker = new L.Marker(map.getCenter(),{icon: searchPin});
					mymarker.addTo(map);
					center = mymarker.getLatLng();
					var lat = mymarker.getLatLng().lat;
					var lng = mymarker.getLatLng().lng;
					var latlng = lat +','+ lng;
					url = "http://maps.apple.com/maps?q="+latlng;
					console.log(url)
					mymarker.bindPopup("<center><p id='sent' onload='initFastButtons()' style='color:black'>"+place+"</p></center>").openPopup();
			}, 1500);
		}
	},
    _callbackId: 0,
    initialize: function (key, options) {
        this.key = key;
        L.Util.setOptions(this, options);
    },
    onAdd: function (map) {
        this._map = map;
        var className = 'leaflet-control-geocoder',
            container = this._container = L.DomUtil.create('div', className);
        if (!L.Browser.touch) {
            L.DomEvent.disableClickPropagation(container);
        } else {
            L.DomEvent.disableClickPropagation(container);
        }
        var form = this._form = L.DomUtil.create('form', className + '-form');
        var input = this._input = document.createElement('input');
        input.type = "text";
        input.class = "ui-input-search";
        input.id = "mytext";
        input.name = "name";
        input.basic = "basic";
        input.placeholder = "    Search for a location";
        var submit = document.createElement('button');
        submit.type = "";
        submit.id = "mybutton";
        submit.innerHTML = this.options.text;
        submit.onClick = "retun false";
        form.appendChild(input);
        form.appendChild(submit);
        L.DomEvent.addListener(form, 'submit', this._geocode, this);
        if (this.options.collapsed) {
            L.DomEvent.addListener(container, 'mouseover', this._expand, this);
            L.DomEvent.addListener(container, 'mouseout', this._collapse, this);
            var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
            link.href = '#';
            link.title = 'Bing Geocoder';
            L.DomEvent.addListener(link, L.Browser.touch ? 'click' : 'focus', this._expand, this);
            this._map.on('movestart', this._collapse, this);
        } else {
            this._expand();
        }
        container.appendChild(form);
        return container;
    },
    _geocode: function (event) {
        L.DomEvent.preventDefault(event);
        this._callbackId = "_l_binggeocoder_" + (this._callbackId++);
        window[this._callbackId] = L.Util.bind(this.options.callback, this);
        var params = {
            query: this._input.value,
            key: this.key,
            jsonp: this._callbackId
        }, url = "http://dev.virtualearth.net/REST/v1/Locations" + L.Util.getParamString(params),
            script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = this._callbackId;
        document.getElementsByTagName("head")[0].appendChild(script);
    },
    _expand: function () {
        L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');
    },
    _collapse: function () {
        this._container.className = this._container.className.replace('leaflet-control-geocoder-expanded', '');
    }
});