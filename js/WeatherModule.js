var WeatherModule = (function(){
	var key = "8813b4e2089efcda00dd83bb4a64be3b";
	var storedWeather = {

	}

	function removeExpired(){
		var currentTime = Math.floor(Date.now() / 1000);
		for (item in storedWeather){
			// if item was saved more than an hour ago
			console.log(item);
			if (item.saved + 3600 <= currentTime) {
				// remove the item
				
			}
		}
	}

	// fetch data from Cache
	function loadFromCache(){
		storedWeather = CacheModule.load("storedWeather") || {};

		// run clean up function on short term
		removeExpired();
	}

	loadFromCache();

	return {
		requestForecast: function(data, callback){
			// prepare data for sending
			// check the address is stored in the GeoModule
			var storedAddr = GeoModule.getLastAddress();
			var coords = {
				lat: null,
				lon: null
			};
			if (storedAddr == data.address){
				// if they're the same then use the stored co-ordinates
				coords = GeoModule.getLastLocation();

				var requestURL = "http://api.openweathermap.org/data/2.5/forecast/forecast?lat=" + coords.lat + "&lon=" + coords.lng + "&units=" + data.units + "&appid=" + key + "&mode=json&days=" + data.days;
				RequestModule.get(requestURL, callback);
			} else {
				// otherwise, decode using geocode
				GeoModule.getCoords(data.address, function(res){

					var lat = res[0].geometry.location.lat();
					var lng = res[0].geometry.location.lng();
					coords["lat"] = lat;
					coords["lon"] = lng;
					var requestURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + coords.lat + "&lon=" + coords.lon + "&days=" + data.days + "&units=" + data.units + "&appid=" + key + "&mode=json";

					var resp = RequestModule.get(requestURL, function(ajax){
						callback(ajax);
					});
					
				});
			}
		},

		tidyForecast: function(raw = array()){

			var rawData = raw.list;
			

			// base data. This will be an array of arrays
			var newData = [];
			
			// map each weather object to their appropriate data
			for (var i = 0; i < rawData.length; i++){
				var d = rawData[i].dt_txt.substring(0,10);
				// check if there are items in the array
				
				// check if the most recent entry set is the same date
				if (newData.length && d == newData[newData.length - 1][0].dt_txt.substring(0,10)){
					// they're the same
					
					newData[newData.length - 1].push(rawData[i]);

				} else {
					
					// append the data by creating a new array
					newData.push([rawData[i]]);

				}
				
				
			}

			return {
				data: newData,
				city: raw.city
			}
		},

		saveForecast: function(address, weather){
			var weatherObj = {
				city: weather.city,
				weather: weather.data,
				saved: Math.floor(Date.now() / 1000)
			}

			
			storedWeather[address] = weatherObj;

			// save to localstorage with an expiry of 1 hour
			console.log("saving forecast")
			CacheModule.save("storedWeather", storedWeather, 3600);
		},

		getDailyWeather: function(weather){
			var w = weather;
			var daily;

			// go through each stored day and get the stored weather for that day. Use mid-values
			daily = w.map(function(day){
				var index = Math.floor(day.length / 2);
				return day[index];
			});

			return daily;
		},

		getXDays: function(weather, days){
			var w = [];
			for (var i = 0; i < days; i++){
				w.push(weather.data[i]);
			}

			weather.data = w;
			return weather;
		}


	}
}())