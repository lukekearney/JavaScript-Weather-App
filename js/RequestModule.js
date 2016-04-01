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