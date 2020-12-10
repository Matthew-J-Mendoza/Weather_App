//why did no one mention &units=imperial after City makes temp so much easier to understand lol

let url_pt1 = "http://api.openweathermap.org/data/2.5/weather?q=";
let City = "Manteca";
let LastCitySearched = ''
let apikey = '&appid=1de51df452c6c848122c0ddbab965dc4';

let fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";

let searchBTN = document.getElementById('searchBTN');
let searchBar = document.getElementById('searchBar');

let Day1 = document.getElementById('Day1');
let Day2 = document.getElementById('Day2');
let Day3 = document.getElementById('Day3');
let Day4 = document.getElementById('Day4');
let Day5 = document.getElementById('Day5');

let currentMorn = document.getElementById('morn');
let currentEve = document.getElementById('eve');
let currentNight = document.getElementById('night');
let Humidity = document.getElementById('Humidity');
let ChanceOfRain = document.getElementById('ChanceOfRain');
let WindSpeed = document.getElementById('WindSpeed');
let AirPressure = document.getElementById('AirPressure');
let todaysCurrenttemp = document.getElementById('todaysCurrenttemp');
let CityLabel = document.getElementById('CityLabel');
let WeatherStatus = document.getElementById('WeatherStatus');
let IconStatus = document.getElementById('IconStatus');
let TodaysDate = document.getElementById('TodaysDate');

let WeekDaySpecific = false;
let DayoWeekNum = 0;


// let Day_1_High = document.getElementById('Day_1_High');
// let Day_2_High = document.getElementById('Day_2_High');
// let Day_3_High = document.getElementById('Day_3_High');
// let Day_4_High = document.getElementById('Day_4_High');
// let Day_5_High = document.getElementById('Day_5_High');

// let Day_1_Low = document.getElementById('Day_1_Low');
// let Day_2_Low = document.getElementById('Day_2_Low');
// let Day_3_Low = document.getElementById('Day_3_Low');
// let Day_4_Low = document.getElementById('Day_4_Low');
// let Day_5_Low = document.getElementById('Day_5_Low');

// let IconDay1 = document.getElementById('IconDay1');
// let IconDay2 = document.getElementById('IconDay2');
// let IconDay3 = document.getElementById('IconDay3');
// let IconDay4 = document.getElementById('IconDay4');
// let IconDay5 = document.getElementById('IconDay5');



let favBTN = document.getElementById('favBTN');
let Favorites = [];
let NFO = JSON.parse(localStorage.getItem('Favlist'))
let FavInject = document.getElementById('FavInject');
let FavNum = 0


let InjHere = document.getElementById('InjectionPoint');


// async function LW3(url){
//     let w = await fetch(url);
//     let d = await w.json();
//     console.log(d);
//     console.log(d.name);
// }


// LW3(fiveDayUrl+City+apikey);
function favCheck(){
    let Faved = false;
    if (Favorites.length > 0){
        for (a = 0; a < Favorites.length; a++){
            if (LastCitySearched.toUpperCase() == Favorites[a]){
                Faved = true;
            }
        }
    }
    if (Faved == true){
        favBTN.className = "fas fa-star mt-2";
    } else {
        favBTN.className = "far fa-star mt-2";

    }
}
async function currentWeather(url){
    
    let currentForecast = await fetch(url);
    let currentforecastData = await currentForecast.json();
    if(currentforecastData.cod != 404){
        
        LastCitySearched = City
        console.log('You have search: '+LastCitySearched)
        // console.log(url);
        //console.log(currentforecastData);
        
        // console.log("Presssure: "+currentforecastData.main.pressure);
        // console.log("Humidity: "+currentforecastData.main.humidity);
        // console.log("wind Speed: "+currentforecastData.wind.speed);
        // console.log("Current temp: "+currentforecastData.main.temp);
        favCheck();
        let CurrentDate = new Date (currentforecastData.dt*1000);

        TodaysDate.innerText = CurrentDate.toLocaleString("en-US", {weekday: "long"})+"-"+CurrentDate.toLocaleString("en-US", {month: "numeric"})+'/'+CurrentDate.toLocaleString("en-US", {day: "numeric"})+'/'+CurrentDate.toLocaleString("en-US", {year: "numeric"})

        Humidity.innerText = currentforecastData.main.humidity+"%";
        WindSpeed.innerText = Math.round(currentforecastData.wind.speed)+"mph";
        AirPressure.innerText = currentforecastData.main.pressure*100+"Pa"
        todaysCurrenttemp.innerText = Math.round(currentforecastData.main.temp)+ ' °F';
        CityLabel.innerText = currentforecastData.name+", "+currentforecastData.sys.country;
        WeatherStatus.innerText = currentforecastData.weather[0].description;

        IconStatus.src = 'http://openweathermap.org/img/wn/'+currentforecastData.weather[0].icon+"@2x.png";

        //http://openweathermap.org/img/wn/10d@2x.png

        OneCallAPI("https://api.openweathermap.org/data/2.5/onecall?lat="+currentforecastData.coord.lat+'&lon='+currentforecastData.coord.lon+'&units=imperial'+"&exclude="+apikey);

        //console.log(currentforecastData);
        fiveDayForecast(fiveDayUrl+City+"&units=imperial"+apikey);
    } else{
        alert ("City not found")
        City = LastCitySearched;
        console.log("City is still: "+City)
    }
}
async function fiveDayForecast(url){
    
    let fiveForecast = await fetch(url);
    let fiveforecastData = await fiveForecast.json();
    //console.log(fiveforecastData);
    
    if (WeekDaySpecific ==false){
        //console.log(new Date(fiveforecastData.list[1].dt*1000))
    
    
    //console.log(dateText1.toLocaleString("en-US", {month: "numeric"})+'/'+dateText1.toLocaleString("en-US", {day: "numeric"})+'/'+dateText1.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText1.toLocaleString("en-US", {weekday: "long"}))

        let Day_1_High = document.getElementById('Day_1_High');
    let Day_2_High = document.getElementById('Day_2_High');
    let Day_3_High = document.getElementById('Day_3_High');
    let Day_4_High = document.getElementById('Day_4_High');
    let Day_5_High = document.getElementById('Day_5_High');
    
    let Day_1_Low = document.getElementById('Day_1_Low');
    let Day_2_Low = document.getElementById('Day_2_Low');
    let Day_3_Low = document.getElementById('Day_3_Low');
    let Day_4_Low = document.getElementById('Day_4_Low');
    let Day_5_Low = document.getElementById('Day_5_Low');
    
    let IconDay1 = document.getElementById('IconDay1');
    let IconDay2 = document.getElementById('IconDay2');
    let IconDay3 = document.getElementById('IconDay3');
    let IconDay4 = document.getElementById('IconDay4');
    let IconDay5 = document.getElementById('IconDay5');

    

        

        Day_1_High.innerText = Math.round(fiveforecastData.list[0].main.temp_max)+" °F";
        Day_1_Low.innerText = Math.round(fiveforecastData.list[0].main.temp_min)+" °F";
        Day_2_High.innerText = Math.round(fiveforecastData.list[1].main.temp_max)+" °F";
        Day_2_Low.innerText = Math.round(fiveforecastData.list[1].main.temp_min)+" °F";
        Day_3_High.innerText = Math.round(fiveforecastData.list[2].main.temp_max)+" °F";
        Day_3_Low.innerText = Math.round(fiveforecastData.list[2].main.temp_min)+" °F";
        Day_4_High.innerText = Math.round(fiveforecastData.list[3].main.temp_max)+" °F";
        Day_4_Low.innerText = Math.round(fiveforecastData.list[3].main.temp_min)+" °F";
        Day_5_High.innerText = Math.round(fiveforecastData.list[4].main.temp_max)+" °F";
        Day_5_Low.innerText = Math.round(fiveforecastData.list[4].main.temp_min)+" °F";
    
        IconDay1.src = 'http://openweathermap.org/img/wn/'+fiveforecastData.list[0].weather[0].icon+"@2x.png";
        IconDay2.src = 'http://openweathermap.org/img/wn/'+fiveforecastData.list[1].weather[0].icon+"@2x.png";
        IconDay3.src = 'http://openweathermap.org/img/wn/'+fiveforecastData.list[2].weather[0].icon+"@2x.png";
        IconDay4.src = 'http://openweathermap.org/img/wn/'+fiveforecastData.list[3].weather[0].icon+"@2x.png";
        IconDay5.src = 'http://openweathermap.org/img/wn/'+fiveforecastData.list[4].weather[0].icon+"@2x.png";
    } else{

    }
     
}
async function OneCallAPI(url){
    //console.log(url);
    
    let OCA = await fetch(url);
    let ocatData = await OCA.json();
    
    // console.log('Chance of rain: '+ocatData.hourly[0].pop);
    // console.log('morn: '+ocatData.daily[0].temp.morn)
    // console.log('eve: '+ocatData.daily[0].temp.eve)
    console.log(ocatData)
    currentMorn.innerText = Math.round(ocatData.daily[0].temp.morn)+ ' °F';
    currentEve.innerText = Math.round(ocatData.daily[0].temp.eve)+ ' °F';

    currentNight.innerText = Math.round(ocatData.daily[0].temp.night)+ ' °F';

    ChanceOfRain.innerText = ocatData.hourly[0].pop*100+"%";

    if (WeekDaySpecific ==true){
        let ForecastMorn = document.getElementById('forecasttMorn');
        let ForecastEve = document.getElementById('forecastEve');
        let ForecastNight = document.getElementById('forecastNight');

        let DayofTheWeek = document.getElementById('DayofTheWeek');
        let SpecificDOW = new Date(ocatData.daily[DayoWeekNum].dt*1000);

        //console.log(SpecificDOW.toLocaleString("en-US", {weekday: "long"}))
        DayofTheWeek.innerText = SpecificDOW.toLocaleString("en-US", {weekday: "long"});
        //console.log(ocatData.daily[1].temp.morn)
        ForecastMorn.innerText = Math.round(ocatData.daily[1].temp.morn)+ ' °F';
        ForecastEve.innerText = Math.round(ocatData.daily[DayoWeekNum].temp.eve)+ ' °F';
        ForecastNight.innerText = Math.round(ocatData.daily[DayoWeekNum].temp.night)+ ' °F';

    } else{
    let dateText1 = new Date(ocatData.daily[1].dt*1000);
    let dateText2 = new Date(ocatData.daily[2].dt*1000);
    let dateText3 = new Date(ocatData.daily[3].dt*1000);
    let dateText4 = new Date(ocatData.daily[4].dt*1000);
    let dateText5 = new Date(ocatData.daily[5].dt*1000);

    let Date1 = document.getElementById('Date1');
    let Date2 = document.getElementById('Date2');
    let Date3 = document.getElementById('Date3');
    let Date4 = document.getElementById('Date4');
    let Date5 = document.getElementById('Date5');

    Date1.innerText = dateText1.toLocaleString("en-US", {month: "numeric"})+'/'+dateText1.toLocaleString("en-US", {day: "numeric"})+'/'+dateText1.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText1.toLocaleString("en-US", {weekday: "long"})
        Date2.innerText = dateText2.toLocaleString("en-US", {month: "numeric"})+'/'+dateText2.toLocaleString("en-US", {day: "numeric"})+'/'+dateText2.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText2.toLocaleString("en-US", {weekday: "long"})
        Date3.innerText = dateText3.toLocaleString("en-US", {month: "numeric"})+'/'+dateText3.toLocaleString("en-US", {day: "numeric"})+'/'+dateText3.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText3.toLocaleString("en-US", {weekday: "long"})
        Date4.innerText = dateText4.toLocaleString("en-US", {month: "numeric"})+'/'+dateText4.toLocaleString("en-US", {day: "numeric"})+'/'+dateText4.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText4.toLocaleString("en-US", {weekday: "long"})
        Date5.innerText = dateText5.toLocaleString("en-US", {month: "numeric"})+'/'+dateText5.toLocaleString("en-US", {day: "numeric"})+'/'+dateText5.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText5.toLocaleString("en-US", {weekday: "long"})
    }



    
}


// LW5(fiveDayUrl+City+apikey);

searchBTN.addEventListener('click', function(){
    City = searchBar.value;
    console.log(City);
    currentWeather(url_pt1+City+'&units=imperial'+apikey);
    searchBar.value = "";
    WeeklyForecast(0);
})
searchBar.addEventListener('keypress', function(e){
    if (e.code == "Enter" && e.target.value != '')
    {
        console.log(e.code)
        City = e.target.value;
    console.log(City);
    currentWeather(url_pt1+City+'&units=imperial'+apikey);
    e.target.value = '';
    WeeklyForecast(0);
    }
})

Day1.addEventListener('click',function(){
    // DaysOftheWeekForecast('https://spreadsheets.google.com/feeds/list/1fOLTeJmKnZ_agfjH-qYr9VO7KfkXlUA7rKYBv86gwIo/1/public/full?alt=json');
    DayoWeekNum = 1
    DaysOftheWeekForecast(1);
    
});
Day2.addEventListener('click',function(){
    DayoWeekNum = 2
    DaysOftheWeekForecast(1);
    
});
Day3.addEventListener('click',function(){
    DayoWeekNum = 3
    DaysOftheWeekForecast(1);
    
});
Day4.addEventListener('click',function(){
    DayoWeekNum = 4
    DaysOftheWeekForecast(1);
    
});
Day5.addEventListener('click',function(){
    DayoWeekNum = 5
    DaysOftheWeekForecast(1);
    
});

async function DaysOftheWeekForecast(inject){
    let WDF = await fetch('https://spreadsheets.google.com/feeds/list/1fOLTeJmKnZ_agfjH-qYr9VO7KfkXlUA7rKYBv86gwIo/1/public/full?alt=json');
    let WDFData = await WDF.json();
    // console.log(WDFData.feed.entry[inject].gsx$html.$t)
    InjHere.innerHTML = WDFData.feed.entry[inject].gsx$html.$t
    setTimeout(function(){  
    let GoBack = document.getElementById('GoBack');
    
    
    WeekDaySpecific = true;
    currentWeather(url_pt1+City+'&units=imperial'+apikey);
    
    GoBack.addEventListener('click',function(){
        WeeklyForecast(0)
    });
    }, 500);

    
}

async function WeeklyForecast(inject){
    let WDF = await fetch('https://spreadsheets.google.com/feeds/list/1fOLTeJmKnZ_agfjH-qYr9VO7KfkXlUA7rKYBv86gwIo/1/public/full?alt=json');
    let WDFData = await WDF.json();
    // console.log(WDFData.feed.entry[inject].gsx$html.$t)
    InjHere.innerHTML = WDFData.feed.entry[inject].gsx$html.$t
    setTimeout(function(){
        let Day1 = document.getElementById('Day1');
let Day2 = document.getElementById('Day2');
let Day3 = document.getElementById('Day3');
let Day4 = document.getElementById('Day4');
let Day5 = document.getElementById('Day5');

WeekDaySpecific = false
currentWeather(url_pt1+City+'&units=imperial'+apikey);

Day1.addEventListener('click',function(){
    DayoWeekNum = 1
    DaysOftheWeekForecast(1);
    
});
Day2.addEventListener('click',function(){
    DayoWeekNum = 2
    DaysOftheWeekForecast(1);
    
});
Day3.addEventListener('click',function(){
    DayoWeekNum = 3
    DaysOftheWeekForecast(1);
    
});
Day4.addEventListener('click',function(){
    DayoWeekNum = 4
    DaysOftheWeekForecast(1);
    
});
Day5.addEventListener('click',function(){
    DayoWeekNum = 5
    DaysOftheWeekForecast(1);
    
});
    
    }, 500);
}

// .text (use this to inject html code)


favBTN.addEventListener('click',function(e){
    let isOnList = false;

    if (Favorites.length > 0){
        for (a = 0; a<Favorites.length; a++){
            
            if (Favorites[a] == LastCitySearched.toUpperCase()){
                isOnList = true;
                Favorites.splice(a,1);
                document.getElementById(LastCitySearched.toUpperCase()).remove();
                console.log(LastCitySearched+" has been removed");
                localStorage.setItem("Favlist", JSON.stringify(Favorites))
                e.target.className = "far fa-star mt-2";
            }

        }
    }
    if (isOnList == false){
        createFavBtn(LastCitySearched);
    addToFavorites(LastCitySearched);
    console.log(Favorites);
    e.target.className = "fas fa-star mt-2";

}
console.log(isOnList);
});
function addToFavorites(FavCity){
        Favorites.push(FavCity.toUpperCase());
        localStorage.setItem("Favlist", JSON.stringify(Favorites))
    console.log(FavCity+" has been add to list!");
}

function createFavBtn(cityName){
    let Column = document.createElement('div');
    Column.className = "col-12 text-center Mouse";
    Column.setAttribute('id', cityName.toUpperCase());
    
    let cityText = document.createElement('p');
    cityText.className = "text-truncate cutOff"
    cityText.innerText = cityName.toUpperCase()
    Column.addEventListener('click', function(){
        City = cityText.innerText;
        //console.log(City);
        searchBar.value = ""
    currentWeather(url_pt1+City+'&units=imperial'+apikey);
    })
    Column.appendChild(cityText);
    FavInject.appendChild(Column);
    
}
currentWeather(url_pt1+City+'&units=imperial'+apikey);

if( NFO != "" || NFO != null)
{
    for(let i =0; i< NFO.length; i++)
    {
        let Column = document.createElement('div');
        Column.className = "col-12 text-center Mouse";
        Column.setAttribute('id', NFO[i]);
        
        let cityText = document.createElement('p');
        cityText.className = "text-truncate cutOff"
        cityText.innerText = NFO[i].toUpperCase()
    
        Column.appendChild(cityText);

        Column.addEventListener('click', function(){
            City = cityText.innerText;
            //console.log(City);
            searchBar.value = "";
        currentWeather(url_pt1+City+'&units=imperial'+apikey);
        })
        
    
        
        FavInject.appendChild(Column);
        Favorites.push(NFO[i]);
        //localStorage.setItem("Favlist", JSON.stringify(Favorites))
    }
}

