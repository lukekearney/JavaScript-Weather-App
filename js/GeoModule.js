"use strict"
var GeoModule = (function() {
	var GeoCoder;
	var lastLocation = {
		lat:null,
		lng:null
	}
	var lastAddress;
	var geoCodeResults = {
		"address": {

		},
		"coords": {

		}
	}

	return {
		getCurrentLocation: function(callback){
			var callback = callback || null;
			// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
			if (navigator.geolocation){
				var result = navigator.geolocation.getCurrentPosition(callback);
			} else {
				// check if theres a callback
        		if (callback.error){
        			callback.error();
        		} 

        		console.error("Geolocation is not supported");
			}

			return result;
		},

		setGeocoder: function(geocoder) {
			GeoCoder = new google.maps.Geocoder();
		},

		getGeocoder: function(){
			return GeoCoder;
		},

		getAddress: function(lat, long, callback){

			if (geoCodeResults.coords){
				if (rounded(geoCodeResults.coords.lat) == rounded(lat) && rounded(geoCodeResults.coords.lng) == rounded(long)){
					results = geoCodeResults.coords.data;
					callback(results);
					return true;
				}
			} 

			var result = GeoCoder.geocode({
				location: {
					lat: lat, 
					lng: long
				}
			}, function(results, status){
				if (status === google.maps.GeocoderStatus.OK) {
					// resultsMap.setCenter(results[0].geometry.location);
					// var marker = new google.maps.Marker({
					//   map: resultsMap,
					//   position: results[0].geometry.location
					// });
					// saves the data
					geoCodeResults.coords["lat"] = lat;
					geoCodeResults.coords["lng"] = long;
					geoCodeResults.coords["data"] = results;
					callback(results);
					//console.log(self.lastAddress);
			    } else {
			    	alert('Geocode was not successful for the following reason: ' + status);
			    }
			});

			//console.log(self.lastAddress);
		},

		getCoords: function(address, callback) {
			// get the coordinates of an address
			// TODO: Check if the address is in cache
			
			if (geoCodeResults.address){
				if (geoCodeResults.address.label == address){
					
					results = geoCodeResults.address.data;
					
					callback(results);
					return true;
				}
			} 

			// https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple
			var results = GeoCoder.geocode({
				address: address
			}, function(results, status){
				if (status === google.maps.GeocoderStatus.OK) {
					// filter the results
					var foundResults = [];
					// filter returns true if the element is to be added to the array
					var filteredResults = results.filter(function(elem){
						// if its found in the array
						if (foundResults[elem.formatted_address]){
							console.log("found " + elem.formatted_address);
							return false;
						}

						// note that the value has been found
						foundResults[elem.formatted_address] = true;
						console.log(foundResults);

						return true;
					})
					// save the results
					geoCodeResults.address["label"] = address;
					geoCodeResults.address["data"] = filteredResults;

					callback(filteredResults);
			    } else {
			    	alert('Geocode was not successful for the following reason: ' + status);
			    }
			});
			
		},

		saveLastLocation: function(lat, long){

			lastLocation.lat = lat;
			lastLocation.lng = long;
		},

		getLastLocation: function() {
			
			return lastLocation;
		},

		saveLastAddress: function(address){
			lastAddress = address;
		},

		getLastAddress: function(address){
			return lastAddress;
		},

		saveLastRequest: function(address, lat, lang){

		},

		loadLastRequests: function(){
			// access local cache and return results
		}


	}
	
}());