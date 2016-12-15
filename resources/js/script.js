$(document).ready(function() {

	var tempC, tempF;
	var isTempC = true;

	var getWeather = function(ipAddress){

		$.getJSON("http://api.apixu.com/v1/current.json?key=9d7b523f927e402abb672245162211&q=" + ipAddress, showWeather);
	};

	var getLocation = function() {
		$.getJSON("http://freegeoip.net/json/", showPosition);
	};

	var showPosition = function(position) {
		getWeather(position.ip);
		$("#location").html(position.city + ", " + position.country);

	};

	var showWeather = function(weather){
		tempC = weather.current.temp_c;
		tempF = weather.current.temp_f;

		$("#temp").html(tempC + " &#8451;");
		$("#status").html(weather.current.condition.text);
		$("#icon").attr("src","http:" + weather.current.condition.icon);
		
	}

	$("#temp").click(function(){
		if(isTempC){
			$("#temp").html(tempF + " &#8457;");
			isTempC = false;
		}else {
			$("#temp").html(tempC + " &#8451;");
			isTempC = true;
		}
	});

	$('[data-toggle="tooltip"]').tooltip();

	getLocation();

});
