(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['3hrForecast'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "	<li class=\"weather-list__item weather-list__item--no-underline\">\n		<div class=\"weather-list__item__date\">"
    + alias3((helpers.getTime || (depth0 && depth0.getTime) || alias2).call(alias1,(depth0 != null ? depth0.dt : depth0),{"name":"getTime","hash":{},"data":data}))
    + "</div>\n		<div class=\"weather-list__item__info\">\n			<div class=\"weather-list__item__info--rain weather-list__item__info__sub-item\">Rainfall <br> "
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.rain : depth0)) != null ? stack1["3h"] : stack1), depth0))
    + " "
    + alias3((helpers.getRainfallUnit || (depth0 && depth0.getRainfallUnit) || alias2).call(alias1,(depths[1] != null ? depths[1].unit : depths[1]),{"name":"getRainfallUnit","hash":{},"data":data}))
    + "</div>\n			<div class=\"weather-list__item__info--weather weather-list__item__info__sub-item\"><span class=\"typcn typcn-weather-"
    + alias3((helpers.getIcon || (depth0 && depth0.getIcon) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.icon : stack1),{"name":"getIcon","hash":{},"data":data}))
    + "\"></span>\n			"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.description : stack1), depth0))
    + "</div>\n			<div class=\"weather-list__item__info--temp weather-list__item__info__sub-item\">\n				<div class=\"temp--high\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.main : depth0)) != null ? stack1.temp_max : stack1), depth0))
    + " "
    + ((stack1 = (helpers.getTempUnit || (depth0 && depth0.getTempUnit) || alias2).call(alias1,(depths[1] != null ? depths[1].unit : depths[1]),{"name":"getTempUnit","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n				<div class=\"temp--low\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.main : depth0)) != null ? stack1.temp_min : stack1), depth0))
    + " "
    + ((stack1 = (helpers.getTempUnit || (depth0 && depth0.getTempUnit) || alias2).call(alias1,(depths[1] != null ? depths[1].unit : depths[1]),{"name":"getTempUnit","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n			</div>\n		</div>\n		<div class=\"weather-list__item__additional_info weather-list__item__info js-more-info--hidden\">\n			<div class=\"weather-list__item__info__sub-item\">Wind speed <br> <span class=\"\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.wind : depth0)) != null ? stack1.speed : stack1), depth0))
    + "</span></div>\n			<div class=\"weather-list__item__info__sub-item\">Humidity <br>\n			<span class=\"\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.main : depth0)) != null ? stack1.humidity : stack1), depth0))
    + "</span></div>\n			<div class=\"weather-list__item__info__sub-item\">Pressure <br> <span class=\"\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.main : depth0)) != null ? stack1.pressure : stack1), depth0))
    + "</span> </div>\n		</div>\n		\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<ul class=\"weather-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.weather : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true,"useDepths":true});
templates['dayForecast'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing;

  return "<div class=\"weather-list__item__info\">\n	<div class=\"weather-list__item__info--rain weather-list__item__info__sub-item\">Rainfall <br> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1.rain : stack1)) != null ? stack1["3h"] : stack1), depth0))
    + " "
    + alias2((helpers.getRainfallUnit || (depth0 && depth0.getRainfallUnit) || alias4).call(alias3,(depth0 != null ? depth0.unit : depth0),{"name":"getRainfallUnit","hash":{},"data":data}))
    + "</div>\n	<div class=\"weather-list__item__info--weather weather-list__item__info__sub-item\"><span class=\"typcn typcn-weather-"
    + alias2((helpers.getIcon || (depth0 && depth0.getIcon) || alias4).call(alias3,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1.weather : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.icon : stack1),{"name":"getIcon","hash":{},"data":data}))
    + "\"></span>\n	"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1.weather : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.description : stack1), depth0))
    + "</div>\n	<div class=\"weather-list__item__info--temp weather-list__item__info__sub-item\">\n		<div class=\"temp--high\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1.main : stack1)) != null ? stack1.temp_max : stack1), depth0))
    + " "
    + ((stack1 = (helpers.getTempUnit || (depth0 && depth0.getTempUnit) || alias4).call(alias3,(depth0 != null ? depth0.unit : depth0),{"name":"getTempUnit","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n		<div class=\"temp--low\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1.main : stack1)) != null ? stack1.temp_min : stack1), depth0))
    + " "
    + ((stack1 = (helpers.getTempUnit || (depth0 && depth0.getTempUnit) || alias4).call(alias3,(depth0 != null ? depth0.unit : depth0),{"name":"getTempUnit","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n	</div>\n</div>\n<div class=\"weather-list__item__additional_info weather-list__item__info js-more-info--hidden\">\n	<div class=\"weather-list__item__info__sub-item\">Wind speed <br> <span class=\"\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1.wind : stack1)) != null ? stack1.speed : stack1), depth0))
    + "</span></div>\n	<div class=\"weather-list__item__info__sub-item\">Humidity <br>\n	<span class=\"\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1.main : stack1)) != null ? stack1.humidity : stack1), depth0))
    + "</span></div>\n	<div class=\"weather-list__item__info__sub-item\">Pressure <br> <span class=\"\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1.main : stack1)) != null ? stack1.pressure : stack1), depth0))
    + "</span> </div>\n</div>";
},"useData":true});
templates['errorDialog'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"dialog dialog--"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"dialog__icon\">\n		<span class=\"typcn typcn-"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "-outline\"></span>\n    </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<p>"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.type : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['locationOptions'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "		<li class=\"location-list__item\"><button data-lat=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.geometry : depth0)) != null ? stack1.location : stack1)) != null ? stack1.lat : stack1), depth0))
    + "\" data-long=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.geometry : depth0)) != null ? stack1.location : stack1)) != null ? stack1.lng : stack1), depth0))
    + "\" class=\"location-list__button button\">"
    + alias2(alias1((depth0 != null ? depth0.formatted_address : depth0), depth0))
    + "</button></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.locations : depth0)) != null ? stack1.length : stack1), depth0))
    + " Locations Found. Please choose one\n<ul class=\"location-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.locations : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});
templates['test'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header>\n\n</header>";
},"useData":true});
templates['weatherForm'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"overlay form-pane container__pane\">				\n	<form action=\"#\" method=\"GET\" id=\"weather-form\" class=\"info-pane__form centred\">\n		<div class=\"form-group \">\n			<h2>Location</h2>\n			<p>Enter the location you want, or click the button to use your current location</p>\n			<div class=\"inner-container\">\n				<div class=\"button-pane\">\n					<button id=\"btn-current-location\" class=\"get-current-location\"><span class=\"typcn typcn-location\"></span></button>\n				</div>\n				<div class=\"text-pane\">\n					<label>\n						<input type=\"text\" id=\"address-input\" name=\"address\" placeholder=\"Type location\">\n					</label>\n				</div>\n				\n			</div>\n		</div>\n		<div id=\"location-options\">\n		</div>\n		<div class=\"group\">\n			<div class=\"form-group\">\n				<h2>Units</h2>\n				<div class=\"form-group__radio\">\n					<input type=\"radio\" class=\"screen-hidden\" id=\"imperial\" name=\"units\" value=\"imperial\"/>\n					<label for=\"imperial\" class=\"form-group__radio__item\">Imperial<br></label>\n				\n					<input type=\"radio\" class=\"screen-hidden\" id=\"metric\" name=\"units\" value=\"metric\"/><label for=\"metric\" class=\"form-group__radio__item\">Metric<br></label>\n				</div>\n				\n			</div>\n			\n			<div class=\"form-group\">\n				<h2>Num days</h2>\n				<label>\n					<input id=\"days\" type=\"range\" min=\"1\" max=\"5\" value=\"1\"/>\n					<span id=\"days-display\" class=\"range-counter\">1</span>\n				</label>\n			</div>\n		</div>\n		<input type=\"submit\" value=\"submit\" class=\"button submit-btn\"/>\n		\n	</form>\n</div>";
},"useData":true});
templates['weatherInfo'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "			<li id=\"weather-list-item-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"weather-list__item\">\n				<div class=\"weather-list__item__date clearfix\">"
    + alias4((helpers.getDay || (depth0 && depth0.getDay) || alias2).call(alias1,(depth0 != null ? depth0.dt : depth0),{"name":"getDay","hash":{},"data":data}))
    + " <button id=\"mode-toggle-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"mode-btn\" data-index=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-mode=\"day\">3hr mode</button></div>\n				<div class=\"js-weather-info\">\n					<div class=\"weather-list__item__info\">\n						<div class=\"weather-list__item__info--rain weather-list__item__info__sub-item\">Rainfall <br> "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.rain : depth0)) != null ? stack1["3h"] : stack1), depth0))
    + " "
    + alias4((helpers.getRainfallUnit || (depth0 && depth0.getRainfallUnit) || alias2).call(alias1,(depths[1] != null ? depths[1].unit : depths[1]),{"name":"getRainfallUnit","hash":{},"data":data}))
    + "</div>\n						<div class=\"weather-list__item__info--weather weather-list__item__info__sub-item\"><span class=\"typcn typcn-weather-"
    + alias4((helpers.getIcon || (depth0 && depth0.getIcon) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.icon : stack1),{"name":"getIcon","hash":{},"data":data}))
    + "\"></span>\n						"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.weather : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.description : stack1), depth0))
    + "</div>\n						<div class=\"weather-list__item__info--temp weather-list__item__info__sub-item\">\n							<div class=\"temp--high\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.main : depth0)) != null ? stack1.temp_max : stack1), depth0))
    + " "
    + ((stack1 = (helpers.getTempUnit || (depth0 && depth0.getTempUnit) || alias2).call(alias1,(depths[1] != null ? depths[1].unit : depths[1]),{"name":"getTempUnit","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n							<div class=\"temp--low\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.main : depth0)) != null ? stack1.temp_min : stack1), depth0))
    + " "
    + ((stack1 = (helpers.getTempUnit || (depth0 && depth0.getTempUnit) || alias2).call(alias1,(depths[1] != null ? depths[1].unit : depths[1]),{"name":"getTempUnit","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n						</div>\n					</div>\n					<div class=\"weather-list__item__additional_info weather-list__item__info js-more-info--hidden\">\n						<div class=\"weather-list__item__info__sub-item\">Wind speed <br> <span class=\"\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.wind : depth0)) != null ? stack1.speed : stack1), depth0))
    + "</span></div>\n						<div class=\"weather-list__item__info__sub-item\">Humidity <br>\n						<span class=\"\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.main : depth0)) != null ? stack1.humidity : stack1), depth0))
    + "</span></div>\n						<div class=\"weather-list__item__info__sub-item\">Pressure <br> <span class=\"\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.main : depth0)) != null ? stack1.pressure : stack1), depth0))
    + "</span> </div>\n					</div>\n				</div>\n			</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "<div class=\"info-pane container__pane\">\n	<div class=\"info-pane__location\">\n		<h1>Weather information for</h1>\n		<span class=\"larger-text\">"
    + alias3(((helper = (helper = helpers.requestedCity || (depth0 != null ? depth0.requestedCity : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"requestedCity","hash":{},"data":data}) : helper)))
    + "</span>\n		<form>\n			Show information such as Humidity, Pressure and Wind Speed <br>\n			<input type=\"checkbox\" id=\"more-info-check\">\n		</form>\n	</div>\n	<div class=\"info-pane__current-day\">\n		<div class=\"info-pane__current-day__item info-pane__current-day__item--weather\">\n			<h2>Today</h2>\n			<span class=\"typcn typcn-weather-"
    + alias3((helpers.getIcon || (depth0 && depth0.getIcon) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.daily : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.weather : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.icon : stack1),{"name":"getIcon","hash":{},"data":data}))
    + "\"></span>\n		</div>\n		<div class=\"info-pane__current-day__item info-pane__current-day__item--temp\">\n			<span class=\"temp--high\">"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.daily : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.main : stack1)) != null ? stack1.temp_max : stack1), depth0))
    + " "
    + ((stack1 = (helpers.getTempUnit || (depth0 && depth0.getTempUnit) || alias2).call(alias1,(depth0 != null ? depth0.unit : depth0),{"name":"getTempUnit","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n			<span class=\"temp--low\">"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.daily : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.main : stack1)) != null ? stack1.temp_min : stack1), depth0))
    + " "
    + ((stack1 = (helpers.getTempUnit || (depth0 && depth0.getTempUnit) || alias2).call(alias1,(depth0 != null ? depth0.unit : depth0),{"name":"getTempUnit","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n		</div>\n		<div class=\"info-pane__current-day__item info-pane__current-day__item--desc\">\n			"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.daily : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.weather : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.description : stack1), depth0))
    + "\n		</div>\n		<div class=\"info-pane__current-day__additional-info js-more-info--hidden\">\n			<div class=\"info-pane__current-day__additional-info__sub-item\">Rainfall <hr> <span class=\"\">"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.daily : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.rain : stack1)) != null ? stack1["3h"] : stack1), depth0))
    + " "
    + alias3((helpers.getRainfallUnit || (depth0 && depth0.getRainfallUnit) || alias2).call(alias1,(depth0 != null ? depth0.unit : depth0),{"name":"getRainfallUnit","hash":{},"data":data}))
    + "</span></div>\n			<div class=\"info-pane__current-day__additional-info__sub-item\">Wind speed <hr> <span class=\"\">"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.daily : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.wind : stack1)) != null ? stack1.speed : stack1), depth0))
    + "</span></div>\n			<div class=\"info-pane__current-day__additional-info__sub-item\">Humidity <hr>\n			<span class=\"\">"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.daily : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.main : stack1)) != null ? stack1.humidity : stack1), depth0))
    + "</span></div>\n			<div class=\"info-pane__current-day__additional-info__sub-item\">Pressure <hr> <span class=\"\">"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.daily : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.main : stack1)) != null ? stack1.pressure : stack1), depth0))
    + "</span> </div>\n		</div>\n	</div>\n	<div class=\"info-pane__forecast\">\n		<ul class=\"weather-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.daily : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n</div>";
},"useData":true,"useDepths":true});
})();
