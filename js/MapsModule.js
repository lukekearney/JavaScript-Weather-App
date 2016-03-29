var MapsModule = (function(){
	var key = "8813b4e2089efcda00dd83bb4a64be3b";
	var map;
	return {
		init: function(element){
			map = new google.maps.Map(mapContainer, {
				center: {lat: 53.3474000259898, lng: -6.259202954653347},
				zoom: 2,
				disableDefaultUI: true
	        });
		},

		gotoLocation: function(lat, lng){
			map.setCenter(new google.maps.LatLng(lat, lng));
			map.setZoom(12);
		}
	}
}())