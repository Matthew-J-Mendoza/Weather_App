let url_pt1 = "http://api.openweathermap.org/data/2.5/weather?q=";
let City = "Manteca";
let apikey = '&appid=1de51df452c6c848122c0ddbab965dc4';

let fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";

let searchBTN = document.getElementById('searchBTN');
let searchBar = document.getElementById('searchBar');

let Day1 = document.getElementById('Day1');
let Day2 = document.getElementById('Day2');
let Day3 = document.getElementById('Day3');
let Day4 = document.getElementById('Day4');
let Day5 = document.getElementById('Day5');

let InjHere = document.getElementById('InjectionPoint');


// async function LW3(url){
//     let w = await fetch(url);
//     let d = await w.json();
//     console.log(d);
//     console.log(d.name);
// }


// LW3(fiveDayUrl+City+apikey);

async function currentWeather(url){
    
    let currentForecast = await fetch(url);
    let currentforecastData = await currentForecast.json();
    if(currentforecastData.cod != 404){
        console.log(currentforecastData);
        console.log(currentforecastData.name);
        fiveDayForecast(fiveDayUrl+City+apikey);
    } else{
        alert ("City not found")
    }
}
async function fiveDayForecast(url){
    
    let fiveForecast = await fetch(url);
    let fiveforecastData = await fiveForecast.json();
    console.log(fiveforecastData.list[0].dt);
}


// LW5(fiveDayUrl+City+apikey);

searchBTN.addEventListener('click', function(e){
    console.log(searchBar.value);
    City = searchBar.value;
    currentWeather(url_pt1+City+apikey);
})

Day1.addEventListener('click',function(){
    // weekdayForecast('https://spreadsheets.google.com/feeds/list/1fOLTeJmKnZ_agfjH-qYr9VO7KfkXlUA7rKYBv86gwIo/1/public/full?alt=json');
    weekdayForecast(1);
});
Day2.addEventListener('click',function(){
    weekdayForecast(1);
});
Day3.addEventListener('click',function(){
    weekdayForecast(1);
});
Day4.addEventListener('click',function(){
    weekdayForecast(1);
});
Day5.addEventListener('click',function(){
    weekdayForecast(1);
});

async function weekdayForecast(inject){
    let WDF = await fetch('https://spreadsheets.google.com/feeds/list/1fOLTeJmKnZ_agfjH-qYr9VO7KfkXlUA7rKYBv86gwIo/1/public/full?alt=json');
    let WDFData = await WDF.json();
    console.log(WDFData.feed.entry[inject].gsx$html.$t)
    InjHere.innerHTML = WDFData.feed.entry[inject].gsx$html.$t
    setTimeout(function(){  
    let GoBack = document.getElementById('GoBack');

    GoBack.addEventListener('click',function(){
        WeeklyForecast(0)
    });
    }, 500);

    
}

async function WeeklyForecast(inject){
    let WDF = await fetch('https://spreadsheets.google.com/feeds/list/1fOLTeJmKnZ_agfjH-qYr9VO7KfkXlUA7rKYBv86gwIo/1/public/full?alt=json');
    let WDFData = await WDF.json();
    console.log(WDFData.feed.entry[inject].gsx$html.$t)
    InjHere.innerHTML = WDFData.feed.entry[inject].gsx$html.$t
    setTimeout(function(){
        let Day1 = document.getElementById('Day1');
let Day2 = document.getElementById('Day2');
let Day3 = document.getElementById('Day3');
let Day4 = document.getElementById('Day4');
let Day5 = document.getElementById('Day5');

Day1.addEventListener('click',function(){
    weekdayForecast(1);
});
Day2.addEventListener('click',function(){
    weekdayForecast(1);
});
Day3.addEventListener('click',function(){
    weekdayForecast(1);
});
Day4.addEventListener('click',function(){
    weekdayForecast(1);
});
Day5.addEventListener('click',function(){
    weekdayForecast(1);
});
    
    }, 500);
}