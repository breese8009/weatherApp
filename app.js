$(document).ready(function(){
let c = 0
let apiKey = '&APPID=ec282729eb8135acaf3a928950b49948'
let forcast = "http://api.openweathermap.org/data/2.5/weather?lat="


$('button').on('click', function(){

	$('#displayWeather').removeClass('hid')

$.getJSON("https://ipinfo.io/", function( data ) {

		let lat = data.loc.split`,`[0]
		let long = data.loc.split`,`[1]

$.getJSON(forcast + lat + '&lon=' + long + apiKey, function( weather ) {
		
		let tempature = Math.floor(fahrenheit(weather.main.temp - 273.15))
		let city = weather.name;
		let weatherIcon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
		let description = weather.weather[0].description.split` `.map(x => x.slice(0,1).toUpperCase()+x.slice(1).toLowerCase()).join` `
		let highs = Math.floor(fahrenheit(weather.main.temp_max - 273.15))
		let lows = Math.floor(fahrenheit(weather.main.temp_min - 273.15))

	if(c<1){
	  c++
	  renderWeatherData(city, tempature, weatherIcon, description, highs, lows)
	} 
	});

  });

});



// cel-273.15, convert to fahrenheit
function fahrenheit(cel){
	return (cel*9)/5+32;
}


function renderWeatherData(city,temp,icon,desc,high,low){
	
	let html = `
		<div id="dataDiv">
	
   			<h1 class="dataHeader">Weather for ${city}, CA.</h1>
   			<img class="dataImg" src=${icon} />
   			<h3 class="dataHeader">${desc}</h3>
   			<h3 class="dataItems">Current tempature: ${temp} F</h3>
   			<h3 class="dataItems">Highs: ${high} F</h3>
   			<h3 class="dataItems">Lows: ${low} F</h3>
    	</div>
	`

	$('#displayWeather').prepend(html)

}

});





