"use strict";
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
			console.log("Request finished");
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
		console.log("entered ajax function");
		/*****

		Sample input
		ajax({
			type: "Get"
			url: google.com,
			params: {
				foo: "bar"
			}
		}, {
			error: function(){
					
			},
			success: function(){
				
			},
			default: function(){
				
			}		
		})

		*****/
		

		if (request.type){
			console.log("Starting request");
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
		console.log("exiting");
	}

	return {
		get: function(url, callback){
			var resp;

			if (url){
				console.log("url is set");
				// TODO: use URL builder function to build the url with the parameters for a get request
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

			// var reqCallback = {

			// }

			// if (callbacks){
			// 	if (callbacks.success || callbacks.default){
			// 		if (callbacks.success){
			// 			reqCallback.success = callbacks.success;
			// 		}

			// 		if (callbacks.error){
			// 			reqCallback.error = callbacks.error;
			// 		}

			// 		if (callbacks.default){
			// 			reqCallback.default = callbacks.default;
			// 		}
			// 	} else {
			// 		reqCallback.default = callbacks;
			// 	}
			// }
			return resp;
		}
	}
}());