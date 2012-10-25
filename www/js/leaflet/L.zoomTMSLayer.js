/* Copyright (c) 2012 OHTSUKA Ko-hei
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

L.ZoomTMSLayer = L.TileLayer.extend({
	options: {
		errorTileUrl:   'data:image/png;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
		tileMaxZoom:    null,
		name:           '',
		alt:            '',
		serviceVersion: '1.0.0',
		layername:      null,
		type:           'jpg',	
	},

	initialize: function (options) {
		if ((typeof options.url) === 'undefined')         throw new Error('Url property is required.');
		if ((typeof options.layername) === 'undefined')   throw new Error('Layername property is required.');
		if ((typeof options.tileMaxZoom) === 'undefined') throw new Error('TileMaxZoom property is required.');

		options = L.Util.setOptions(this, options);

		var path = '{z}/{x}/{y}.' + options.type;
		if (options.layername != '') {
			path = options.layername + '/' + path;
		}
		if (options.serviceVersion != '') {
			path = options.serviceVersion + '/' + path;
		}

		L.TileLayer.prototype.initialize.call(this, options.url + path, options);
	},

	_createTileProto: function () {
		var div = this._tileImg = L.DomUtil.create('div','leaflet-tile');

		var tileSize = this.options.tileSize;
		div.style.width = tileSize + 'px';
		div.style.height = tileSize + 'px';

		var base = div.base = L.DomUtil.create('div', '', div);
		base.style.width = tileSize + 'px';
		base.style.height = tileSize + 'px';

		var img  = div.img = L.DomUtil.create('img', '', base);
		img.style.width  = tileSize + "px";
		img.style.height = tileSize + "px";
		img.style.position = "absolute";
		img.galleryimg = 'no';
	},

	_createTile: function () {
		var tile  = this._tileImg.cloneNode(true);
		tile.base = (tile.getElementsByTagName("div"))[0];
		tile.img  = (tile.getElementsByTagName("img"))[0];
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},

	_loadTile: function (tile, tilePoint) {
		var zoomDiff = this._map.getZoom() - this._getZoomForUrl();

		tile._layer = tile.img._layer = this;
		tile.img.onload  = this._tileOnLoad;
		tile.img.onerror = this._tileOnError;

		var src;
		if (zoomDiff > 0) {
			var dScale = Math.pow(2,zoomDiff);
			var dTranslate = 128 * (dScale -1) / (dScale * 2);
			var dSize      = 128 / dScale;
			var aX         = tilePoint.x % dScale;
			var dX         = dTranslate - aX * dSize;
			var aY         = tilePoint.y % dScale;
			var dY         = dTranslate - aY * dSize;
			tilePoint.x    = Math.floor(tilePoint.x / dScale);
			tilePoint.y    = Math.floor(tilePoint.y / dScale);
			var transStr   = "scale(" + dScale + "," + dScale + ") translate(" + dX + "px," + dY + "px)";

			tile.base.style.transform = transStr;
			tile.base.style.msTransform = transStr;
			tile.base.style.webkitTransform = transStr;
			tile.base.style.MozTransform = transStr;
			tile.base.style.OTransform = transStr;
			tile.img.style.clip = "rect(" + (aY * dSize) + "px," + ((aX + 1) * dSize) + "px," + ((aY + 1) * dSize) + "px," + (aX * dSize) + "px)";

			src = this.getTileUrl(tilePoint);
		} else {
			src = this.getTileUrl(tilePoint);
		}
		tile.img.src = tile.src = src;
	},

	_tileShouldBeLoaded: function (tilePoint) {
		if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
			return false; // already loaded
		}

		if (!this.options.continuousWorld) {
			var limit = this._getWrapTileNum();
			var zoomDiff = this._map.getZoom() - this._getZoomForUrl();
			limit = limit * Math.pow(2, zoomDiff);

			if (this.options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit) ||
				                        tilePoint.y < 0 || tilePoint.y >= limit) {
				return false; // exceeds world bounds
			}
		}

		return true;
	},

	_getZoomForUrl: function () {
		var options = this.options,
			zoom = this._map.getZoom();

		if ( zoom > options.tileMaxZoom) {
			zoom = options.tileMaxZoom;
		}

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		return zoom + options.zoomOffset;
	},

	_tileOnLoad: function (e) {
		var parent = this.parentNode.parentNode;

		var layer = parent._layer;

		parent.className += ' leaflet-tile-loaded';

		layer.fire('tileload', {
			tile: parent,
			url: this.src
		});

		layer._tilesToLoad--;
		if (!layer._tilesToLoad) {
			layer.fire('load');
		}
	}
});

L.zoomTMSLayer = function (options) {
	return new L.ZoomTMSLayer(options);
};
