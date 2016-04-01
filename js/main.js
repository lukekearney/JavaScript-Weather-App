// IIFE prevents pollution of the global scoope and other potential libraries, modules, frameworks etc from overwriting important variables
(function(global){
	/** helpers.JS **/
	function rounded(num){
		return Math.round(num * 1000) / 1000;
	}

	function removeClass(element, cls){
		
		var elClass = element.getAttribute("class");
		
		elClass = elClass.replace(cls, "");
		
		element.setAttribute("class", elClass);
	}

	function replaceClass(element, old, newVal){
		
		var elClass = element.getAttribute("class");
		
		elClass = elClass.replace(old, newVal);
		
		element.setAttribute("class", elClass);
	}

	function isObject(variable){
		if (typeof variable == "object"){
			return true;
		} else {
			return false;
		}
	}

	// http://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try/3710226
	function isJSON(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	Handlebars.registerHelper('rainfall', function(unit = null){
		return unit || 0;
	});

	// add custom Handlebars helper
	// http://stackoverflow.com/questions/15088215/handlebars-js-if-block-helper
	Handlebars.registerHelper('getIcon', function(iconCode) {
	    switch(iconCode){
	    	case "01d":
	    	case "01n":
	    		return "sunny"
	    	case "02d":
	    	case "02n":
	    		return "partly-sunny"
	    	case "03d":
	    	case "03n":
	    	case "04d":
	    	case "04n":
	    		return "cloudy"
	    	case "09d":
	    	case "09n":
	    		return "shower"
	    	case "10d":
	    	case "10n":
	    		return "downpour"
	    	case "11d":
	    	case "11n":
	    		return "stormy"
	    	case "13d":
	    	case "13n":
	    		return "snow"
	    	default:
	    		return "sunny"

	    }
	});

	Handlebars.registerHelper("getTempUnit", function(unit){

		switch(unit){
			case "metric":
				return "&#8451;"
			case "imperial":
				return "&#8457;"
		}

	});

	Handlebars.registerHelper("getRainfallUnit", function(unit){
		switch(unit){
			case "metric":
				return "m"
			case "imperial":
				return "in"
		}

	});

	Handlebars.registerHelper('getMidValue', function(array) {
	    var index = Math.floor(array.length / 2);
	    return array[index];
	});

	Handlebars.registerHelper("getDay", function(dt){
		// http://stackoverflow.com/questions/5634403/getting-day-of-the-week-from-timestamp-using-javascript
		var d = new Date(dt * 1000);
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var dayOfWeek = days[d.getDay()];

		return dayOfWeek;
	});

	Handlebars.registerHelper("getTime", function(dt){
		var d = new Date(dt*1000);
		
		var hours = d.getHours();

		return hours + ":00";
	});

	/** Timer.js sets up a timer class **/
	// https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearTimeout
	var Timer = function(action, interval) {
	    this.action = action;
	    // converts interval from seconds to milliseconds
	    this.interval = interval * 1000;
	};

	Timer.prototype = {
	  setup: function() {
	      var self = this;
	      if (typeof this.timeoutID === "number") {
	          this.cancel();
	      } else {
	          this.timeoutID = window.setTimeout(function(msg) {
	              self.action();
	          }, this.interval);
	      }
	  },

	  cancel: function() {
	      window.clearTimeout(this.timeoutID);
	      this.timeoutID = undefined;
	  }
	}


	/** CacheModule.js handles caching and retrieval of information **/
	var CacheModule = (function() {
	    var prefix = "weather-";

	    // set up the time to clear expired items in cache. Runs every hour
	    var clearExpiredTimer = new Timer(function(){
	        this.cancel();
	        clearExpired();
	        
	        this.setup();
	    }, 3600);
	    clearExpiredTimer.setup();

	    function exists(key) {
	        if (getItem(key)) {
	            return true;
	        } else {
	            return false;
	        }
	    }

	    function clearExpired(key = null){
	        // removes old data from cache, if it has expired. The optional key can be supplied to only target specific storage
	        if (window.localStorage) {
	            var currentTime = Math.floor(Date.now() / 1000);
	            var data;
	            
	            if (key) {
	                // check if the key exists
	                if (exists(key)) {  
	                    // check if it has expired
	                    data = JSON.parse(getItem(key));
	                    if (data.expires) {
	                        // if the current time is higher than the expiry time in the data
	                        if (data.expires <= currentTime) {
	                            // delete from localStorage
	                            removeItem(key);
	                            // return true if removed
	                            return true;
	                        } else {
	                            
	                            // return false if not expired
	                            return false;
	                        }
	                    }

	                } else {
	                    console.error("Cannot check expiry of item ("+ key +") that doesn't exist")
	                }
	            } else {
	                var removeItems = [];
	                // http://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
	                for (var i = 0; i < localStorage.length; ++i) {
	                    // check if the key was set by this application (using the prefix above)
	                    var re = new RegExp(prefix + ".+");
	                    
	                    if (localStorage.key(i).match(re)){
	                        var key = localStorage.key(i).substring(prefix.length);
	                        
	                        // recursively call to remove this key. Check if its removed
	                        if(clearExpired(key)){
	                            // decrement i to account for removed element
	                            i--;
	                        }
	                    }
	                    
	                }
	            }
	        } else {
	            alert("Local Storage is not supported in this browser");
	        }
	    }

	    // small abstractions
	    function getItem(key){
	    	return localStorage.getItem(prefix + key);
	    }

	    function setItem(key, value){
	    	return localStorage.setItem(prefix + key, value);
	    }

	    function removeItem(key){
	    	return localStorage.removeItem(prefix + key);
	    }

	    return {
	        save: function(key, value, expires) {
	            // saves into local storage
	            // check if localStorage is supported
	            if (window.localStorage) {
	                // check if it exists in cache already and updates data if needs be
	                var data;
	                // calculates expiry time
	                var expiryTime = Math.floor(Date.now() / 1000) + expires;


	                data = {
	                    expires: expiryTime,
	                    value: value
	                }

	                // add the value
	                setItem(key, JSON.stringify(data));
	                
	            } else {
	                alert("Local Storage is not supported in this browser");
	            }

	        },

	        load: function(key) {
	            // loads from cache
	            if (window.localStorage) {
	                // check if it exists already
	                if (!exists(key)){
	                    return null;
	                }

	                data = getItem(key);
	                if (isJSON(data)) {
	                    data = JSON.parse(data);
	                }
	                
	                return data.value;
	            } else {
	                alert("Local Storage is not supported in this browser");
	            }
	        },

	        removeExpired: function(key = null) {
	            clearExpired(key);
	        },
	    }
	}());


	/** GeoModule.js handles coordinates and addresses for use by the maps module and frontend interface **/
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
			"coords": []
		}

		function loadFromCache(){
			geoCodeResults = CacheModule.load("geoCodeResults") || geoCodeResults;
			// fetch last address from cache
			lastAddress = CacheModule.load("lastAddress");
			// fetch last location from cache
			lastLocation = CacheModule.load("lastLocation") || {};
		}
		loadFromCache();
		

		return {
			getCurrentLocation: function(err, callback){
				var callback = callback || null;
				// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
				if (navigator.geolocation){
					var result = navigator.geolocation.getCurrentPosition(callback);
				} else {
					// check if theres a callback
	        		if (err){
	        			err(error);
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
					for (var i = 0; i < geoCodeResults.coords.length; i++){
						var item = geoCodeResults.coords[i];
						if (rounded(item.lat) == rounded(lat) && rounded(item.lng) == rounded(long)){
							results = geoCodeResults.coords.data;
							callback(results);
							return true;
						}
					}
					
				} 

				var result = GeoCoder.geocode({
					location: {
						lat: lat, 
						lng: long
					}
				}, function(results, status){
					if (status === google.maps.GeocoderStatus.OK) {
						
						// saves the last geocode request
						var geocodeResult = {

						}

						geocodeResult["lat"] = lat;
						geocodeResult["lng"] = long;
						geocodeResult["data"] = results;

						geoCodeResults.coords.push(geocodeResult);
						
						// save the geoCodeResults
						CacheModule.save("geoCodeResults", geoCodeResults, 31556926);

						callback(results);
						
				    } else {
				    	alert('Geocode was not successful for the following reason: ' + status);
				    }
				});

				
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
								
								return false;
							}

							// note that the value has been found
							foundResults[elem.formatted_address] = true;
							

							return true;
						})
						// save the results
						geoCodeResults.address["label"] = address;
						geoCodeResults.address["data"] = filteredResults;

						// save to longer term storage. Stores for up to a year
						CacheModule.save("geoCodeResults", geoCodeResults, 31556926);
						callback(filteredResults);
				    } else {
				    	alert('Geocode was not successful for the following reason: ' + status);
				    }
				});
				
			},

			saveLastLocation: function(lat, long){

				lastLocation.lat = lat;
				lastLocation.lng = long;
				// save to cache
				CacheModule.save("lastLocation", lastLocation, 31556926);
			},

			getLastLocation: function() {
				
				return lastLocation;
			},

			saveLastAddress: function(address){
				lastAddress = address;
				CacheModule.save("lastAddress", lastAddress, 31556926);
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

	/** RequestModule.js handles AJAX requests **/
	// request module handles ajax requests based on parameters
	var RequestModule = (function(){

		var settings = {
			
		};

		var AjaxRequest = function(response, status){
			this.response = response;
			this.status = status;

			this.done();	
		}

		AjaxRequest.prototype = {
			done: function(){
				
				if (this.status > 399 && this.status < 600){
					// error
					console.error(this.status + ": " + this.response);
				} 
			},

			complete: function(callback){
				// check if a callback exists
				callback = callback || null;
				if (callback){
					callback(this.response);
				}

				// return the object to allow chaining
				return this;
			},

			success: function(callback){
				callback = callback || null;
				if (this.status == 200){
					if (callback){
						callback(this.response);
					}
				}

				// return the object to allow chaining
				return this;
			},

			error: function(callback){
				callback = callback || null;
				// check if it was an error
				if (this.status >= 400 && this.status < 600){
					//check if a callback has been defined
					if(callback){
						// pass the response
						callback(this.response);
					}
				
				}

				// return the object to allow chaining
				return this;
			}
		}


		function ajax(request, callbacks){

			if (request.type){
				
				// check if its a valid type, use the full upper case version
				switch(request.type.toUpperCase()){
					// only accept get and post requests
					case "GET":
					case "POST":
						break;
					default:
						// log the error and exit the function
						console.error(request.type + " is not a recognised request type");
						return false;
				}

				// check the request URL is in place
				
			}
			
		}

		return {
			get: function(url, callback){
				var resp;

				if (url){
					// check if the window.XMLHTTPrequest is present
					// https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
					if (window.XMLHttpRequest){
						var req = new XMLHttpRequest();

						// wait for a change in state and return the result of the callback
						req.onreadystatechange = function(){
							
							if (req.readyState == 4){
								if(callback) {
									callback(new AjaxRequest(req.responseText, req.status));
								}
							}
						}

						req.open("GET", url, true);
						req.send();


					} else {
						console.error("This browser does not support XMLHTTPRequest");
					}
				} else {
					console.error("No url specified");
				}

				
				return resp;
			}
		}
	}());

	/** WeatherModule.js handles fetching, storing and parsing weather information (uses RequestModule.js) **/
	var WeatherModule = (function(){
		var key = "8813b4e2089efcda00dd83bb4a64be3b";
		var storedWeather = {

		}

		function removeExpired(){
			var currentTime = Math.floor(Date.now() / 1000);
			// http://stackoverflow.com/questions/684672/loop-through-javascript-object
			for (item in storedWeather){
				// if item was saved more than an hour ago
				if (storedWeather.hasOwnProperty(item)){
					var weather = storedWeather[item];
					if (weather.saved + 3600 <= currentTime) {
						// remove the item
						// http://stackoverflow.com/questions/3455405/how-to-remove-a-key-from-a-javascript-object
						delete storedWeather[item];
					}
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
	}());

	/** MapsModule.js handles map interactions **/
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
	}());


	var locationOptionsElement = document.getElementById("location-options");

	// form elements
	var addrInput = document.getElementById("address-input");
	var map;

	// https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
	var current = document.querySelector(".get-current-location")
	current.addEventListener("click", function(e){
		e.preventDefault();
		var loaderHTML = "<div class='uil-ring-css' style='transform:scale(0.29);'><div></div></div>";
		if (locationOptionsElement.innerHTML != loaderHTML){
			locationOptionsElement.innerHTML = loaderHTML;
		}
		GeoModule.getCurrentLocation(function(err){
			// error handling

			locationOptionsElement.innerHTML = "";
		}, function(pos){
			
			locationOptionsElement.innerHTML = "";
			// this is where a cache check would come in, check if the co-ordinates are the same
			var lastLocation = GeoModule.getLastLocation();

			// if previous co-ords have been set
			// TODO: Move this code into the GetAddress function and use it to return last results
			if (lastLocation.lat && lastLocation.lng){
				// if same co-ordinates within a certain margin of error http://gis.stackexchange.com/questions/8650/how-to-measure-the-accuracy-of-latitude-and-longitude
				// we don't need precision accuracy for weather data
				if (rounded(lastLocation.lat) == rounded(pos.coords.latitude) && rounded(lastLocation.lng) == rounded(pos.coords.longitude)){
					// fetch the previous stored location
					address = GeoModule.getLastAddress();
					if (address){
						addrInput.value = address;
						// set the new map location
						MapsModule.gotoLocation(pos.coords.latitude, pos.coords.longitude);

						// exit the function
						return true;
					}
					
				} 
			}

			// otherwise fetch the new value
			GeoModule.saveLastLocation(pos.coords.latitude, pos.coords.longitude);
			var results = GeoModule.getAddress(pos.coords.latitude, pos.coords.longitude, function(r){
				
				// select a mid-range index. Avoids overly specific locations or underspecific ones
				var index = Math.floor(r.length / 2);

				var address = r[index].formatted_address;
				addrInput.value = address;

				// store the previous value
				GeoModule.saveLastAddress(address);

				// update the map
				MapsModule.gotoLocation(pos.coords.latitude, pos.coords.longitude);
			});
			
			
			
		});
	});


	var keyPressedInterval = new Timer(function(){
		// define time and callback when the timer runs out

		// note here that if there's only one value, it should set the co-ordinates to that value. However, if there is more than one value, it should wait until one is selected. The same for address. 
		if (addrInput.value.length > 3){
			GeoModule.getCoords(addrInput.value, function(result){
				// for multiple results, load them into the page. Set a flag to say they've been set, and as it continues if it doesn't match the text of one of them then remove it from the list. Once one is selected, use it's id to select the appropriate co-ordinates. This temporary storage is replaced each time there's a new request made for co-ordinates. Only when there is only one potential match or they select one of the items can the form be submitted. Use a flag for this
				
				if (result.length > 1){
					// display the options using a handlebars template
					var template = Handlebars.templates["locationOptions"];
					var html = template({
						locations: result,
					});
					locationOptionsElement.innerHTML = html;

					// get the list of locations that's been generated
					var locationList = document.querySelectorAll(".location-list__button");

					// cycle through locations
					for (var i = 0; i < locationList.length; i++){
						// attach the event listener
						locationList[i].addEventListener("click", function(e){
							// prevent default behaviour
							e.preventDefault();

							// use the get location function
							getLocation(this);
							
						});
					}
					
					
				} else if (result.length == 0){
					// notify that no results found

					var template = Handlebars.templates["locationOptions"];
					var html = template({
						locations: result,
					});
					locationOptionsElement.innerHTML = html;
				} else {
					// result is equal to 1
					locationOptionsElement.innerHTML = "";
				}
			});
		} else {
			locationOptionsElement.innerHTML = "Sorry, you'll need to type some more than that!";
		}
		

	}, 0.5);



	addrInput.addEventListener("keypress", function(e){
		// add a loader to give some feedback
		// code using CSS animations from http://loading.io/
		var loaderHTML = "<div class='uil-ring-css' style='transform:scale(0.29);'><div></div></div>";
		if (locationOptionsElement.innerHTML != loaderHTML){
			locationOptionsElement.innerHTML = loaderHTML;
		}
		

		// reset the counter
		keyPressedInterval.cancel();

	});

	addrInput.addEventListener("keyup", function(e){
		// start the counter
		keyPressedInterval.setup();

	});

	// form elements
	var daysInput = document.getElementById("days");
	var daysOutput = document.getElementById("days-display");
	var weatherForm = document.getElementById("weather-form");
	var currentLocation = document.getElementById("btn-current-location");
	var mapContainer = document.getElementById("primary-map")

	// add event listeners for the daysInput field. Multiple events to support different browser behaviour
	daysInput.addEventListener("input", function(){
		
		showValue(daysOutput, this.value)
	});

	daysInput.addEventListener("change", function(){
		
		showValue(daysOutput, this.value)
	});

	weatherForm.addEventListener("submit", function(e){
		// stop page reload
		e.preventDefault();

		// get form values
		// https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName
		var form = this;
		var address = form.elements["address"];
		var errorTemplate = Handlebars.templates["errorDialog"];
		var html;
		if (address.value.length < 1){
			html = errorTemplate({
				type: "warning",
				"message": "You must provide a location before submitting",		
			});
			document.getElementById("error-dialog").innerHTML = html;

			// break out of the function
			return false;
		}

		// check if the address is valid
		GeoModule.getCoords(addrInput.value, function(result){
			var wf;

			if (result.length > 1){
				// display the options using a handlebars template
				
				var template = Handlebars.templates["locationOptions"];
				html = template({
					locations: result,
				});
				document.getElementById("location-options").innerHTML = html;

				// get the list of locations that's been generated
				var locationList = document.querySelectorAll(".location-list__button");

				// cycle through locations
				for (var i = 0; i < locationList.length; i++){
					// attach the event listener
					locationList[i].addEventListener("click", function(e){
						// prevent default behaviour
						e.preventDefault();

						// use the get location function
						getLocation(this);
						
					});
				}

				// throw the error
				
				html = errorTemplate({
					type: "warning",
					"message": "A location must be definitive before proceeding. Please select one",		
				});
				document.getElementById("error-dialog").innerHTML = html;
				
			} else if (result.length == 1){
				// otherwise continue with the request
				var units = form.elements["units"];
				var days = form.elements["days"];
				var unitValue;
				
				// position the map
				
				MapsModule.gotoLocation(result[0].geometry.location.lat, result[0].geometry.location.lng);

				for (var i = 0; i < units.length; i++){
					// check if that radio button has been selected
					if (units[i].checked){
						// get the value of the checked radio
						unitValue = units[i].value;
					}
				}

				if (unitValue && days.value && address.value){
					// confirm that all information is present
					wf = WeatherModule.requestForecast({
						/*api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}*/
						days: days.value,
						units: unitValue,
						address: address.value,
					}, function($http){
						// callback function. Inspired by a combination of jQuery and Angular
						// promises, like in Angular, might work better, but they're not supported in IE. Alternative involved rewriting the XMLHTTPRequest object

						$http.complete(function(){
							
						}).success(function(resp){
							var rawData = JSON.parse(resp);
							var cleanWeather = WeatherModule.tidyForecast(rawData);
							
							// save the forecast
							WeatherModule.saveForecast(address.value, cleanWeather);

							// only get the requested number of days
							cleanWeather = WeatherModule.getXDays(cleanWeather, days.value);

							var mapPane = document.getElementById("primary-map-pane");
							removeClass(mapPane, "h");
							// load the new weather data into
							var template = Handlebars.templates["weatherInfo"];
							var info = {
								weather: cleanWeather.data,
								city: cleanWeather.city,
								requestedCity: address.value,
								daily: WeatherModule.getDailyWeather(cleanWeather.data),
								unit: unitValue
							}
							
							html = template(info);
							document.getElementById("info").innerHTML = html;

							
							
							// center the map
							MapsModule.gotoLocation(info.city.coord.lat, info.city.coord.lon);

							// add listener's to switch modes
							for (var i = 0; i < days.value; i++){
								var element = document.getElementById("mode-toggle-" + i);
								element.addEventListener("click", function(e){
									e.preventDefault();
									switchMode(this, info);
								});
							}

							// add listener to show more info
							document.getElementById("more-info-check").addEventListener("click", function(){
								checkAdditionalInfo(this);
							});
							
						}).error(function(resp){
							console.error("Error fetching weather results");
						});
					});
				} else {
					html = errorTemplate({
						type: "warning",
						"message": "Please ensure that all information has been provided before submitting",		
					});
					document.getElementById("error-dialog").innerHTML = html;
				}	
			} else {
				html = errorTemplate({
					type: "warning",
					"message": "That location isn't valid. Sorry",		
				});
				document.getElementById("error-dialog").innerHTML = html;
			}
		});

	});

	function showValue(element, value){
		element.innerHTML = value;
	}

	function getLocation(element){
		

		// get the relevant attributes
		var address = element.innerHTML;
		var lat = element.getAttribute("data-lat");
		var long = element.getAttribute("data-long");
		

		var addrInput = document.getElementById("address-input");
		addrInput.value = address;

		// save in the GeoModule short term cache
		GeoModule.saveLastAddress(address);
		GeoModule.saveLastLocation(lat, long);

		// clear the list
		document.getElementById("location-options").innerHTML = "";

	}

	function switchMode(element, information){
		var currentMode = element.getAttribute("data-mode");
		var index = element.getAttribute("data-index");

		if (currentMode == "day"){
			// switch to 3hr
			var info = {
				weather: information.weather[index],
				unit: information.unit
			}

			var template = Handlebars.templates["3hrForecast"];
			var html = template(info);
			var el = document.querySelector("#weather-list-item-" + index + " .js-weather-info");
			el.innerHTML = html;

			element.innerHTML = "Day Mode";
			element.setAttribute("data-mode", "3hr");
		} else {
			// switch to day
			var info = {
				weather: information.daily[index],
				unit: information.unit
			}

			var template = Handlebars.templates["dayForecast"];
			var html = template(info);
			var el = document.querySelector("#weather-list-item-" + index + " .js-weather-info");
			el.innerHTML = html;

			element.innerHTML = "3hr Mode";
			element.setAttribute("data-mode", "day");
		}

		checkAdditionalInfo(document.getElementById("more-info-check"));
	}

	function checkAdditionalInfo(ele){
		if (ele.checked){
			var elements = document.querySelectorAll(".js-more-info--hidden");
			for (var i = 0; i < elements.length; i++){
				replaceClass(elements[i], "js-more-info--hidden", "js-more-info--visible");
			}
		} else {
			var elements = document.querySelectorAll(".js-more-info--visible");
			for (var i = 0; i < elements.length; i++){
				replaceClass(elements[i], "js-more-info--visible", "js-more-info--hidden");
			}
		}
	}

	// this needs to be exposed to the global scope for use by Google maps
	global.initMap = function (){
		MapsModule.init(mapContainer);	
		// set the geocoder reference
		GeoModule.setGeocoder(google.maps.Geocoder);
	}

}(window))