$(document).ready(function(){

	let zip;
	let windSpeed;
	let temp;
	let apiKey = '&APPID=ec282729eb8135acaf3a928950b49948';
	let forcast = "http://api.openweathermap.org/data/2.5/forecast?zip="
	

// get ip info and weather info, nested with weather AJAX JSON function
$.getJSON("https://ipinfo.io/", function( data ) {
	zip=data.postal;

	$.getJSON(forcast+zip+',us'+apiKey, function( weather ) {
		let weatherArr = weather.list;

		console.log(weatherArr);

		weatherArr.forEach((el)=>{	

createHtml(tansformDates(el.dt_txt), fahrenheit(Math.floor(el.main.temp-273.15)), el.wind.speed, el.main.humidity);
		});
	});

});





// cel-273.15, convert to fahrenheit
let fahrenheit= (cel)=>{
	return (cel*9)/5+32;
}

//transform to relative date
function tansformDates(str){
	let arr=str.split`-`;
	let yearMonth = arr.slice(0,2);
	let day = arr.pop().slice(0,2);
	return yearMonth[1]+"/"+day+"/"+yearMonth[0];
}

//transform to relative hour time
function transformTime(str){
	let temp = str.split`-`.slice(2,3);
	let time = temp.join``.split` `.pop();
	let hour = time.split(':')[0];
	if(hour==='24' || hour==='00') return 12;
	else
		return hour<=12 ? parseInt(hour) : hour%12;
}




function createHtml(data,tem,win,hum){
   let date = document.querySelector('.dateData');
   let temp = document.querySelector('.tempData');
   let wind = document.querySelector('.windData');
   let himidity = document.querySelector('.humidityData');
   

   for(let i=0 ; i<data.length; i++){
date.innerHTML +=data[i]+"</br>";
   }
 

 temp.innerHTML = tem + " F";
 // date.innerHTML = data;
 wind.innerHTML = win + " mph";
 himidity.innerHTML = hum + "%";


}

});





