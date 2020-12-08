let url_pt1 = "http://api.openweathermap.org/data/2.5/weather?q=";
let City = "Manteca";
let apikey = '&appid=1de51df452c6c848122c0ddbab965dc4';

let fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";

// async function LW3(url){
//     let w = await fetch(url);
//     let d = await w.json();
//     console.log(d);
//     console.log(d.name);
// }


// LW3(fiveDayUrl+City+apikey);

async function LW3(url){
    let Forecast = await fetch(url);
    let forecastData = await Forecast.json();
    console.log(forecastData);
    console.log(forecastData.name);
}


LW5(fiveDayUrl+City+apikey);