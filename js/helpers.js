function rounded(num){
	return Math.round(num * 1000) / 1000;
}

function removeClass(element, cls){
	console.log("removing class");
	var elClass = element.getAttribute("class");
	console.log(elClass);
	elClass = elClass.replace(cls, "");
	console.log(elClass);
	element.setAttribute("class", elClass);
}

function replaceClass(element, old, newVal){
	
	var elClass = element.getAttribute("class");
	
	elClass = elClass.replace(old, newVal);
	
	element.setAttribute("class", elClass);
}

function rainfall (unit = null){
	return unit || 0;
}

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