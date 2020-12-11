

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






let favBTN = document.getElementById('favBTN');
let Favorites = [];
let NFO = JSON.parse(localStorage.getItem('Favlist'))
let FavInject = document.getElementById('FavInject');
let FavNum = 0


let InjHere = document.getElementById('InjectionPoint');



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
        
        console.log("current:")
        console.log(currentforecastData);
        
        
        favCheck();
        let CurrentDate = new Date (currentforecastData.dt*1000);

        

        TodaysDate.innerText = CurrentDate.toLocaleString("en-US", {weekday: "long"})+"-"+CurrentDate.toLocaleString("en-US", {month: "numeric"})+'/'+CurrentDate.toLocaleString("en-US", {day: "numeric"})+'/'+CurrentDate.toLocaleString("en-US", {year: "numeric"})

        Humidity.innerText = currentforecastData.main.humidity+"%";
        WindSpeed.innerText = Math.round(currentforecastData.wind.speed)+"mph";
        AirPressure.innerText = currentforecastData.main.pressure+"hPa"
        todaysCurrenttemp.innerText = Math.round(currentforecastData.main.temp)+ ' °F';
        CityLabel.innerText = currentforecastData.name+", "+currentforecastData.sys.country;
        WeatherStatus.innerText = currentforecastData.weather[0].description;

        IconStatus.src = 'http://openweathermap.org/img/wn/'+currentforecastData.weather[0].icon+"@2x.png";

        //http://openweathermap.org/img/wn/10d@2x.png

        OneCallAPI("https://api.openweathermap.org/data/2.5/onecall?lat="+currentforecastData.coord.lat+'&lon='+currentforecastData.coord.lon+'&units=imperial'+"&exclude="+apikey);

        
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    console.log("5 day")
    console.log(fiveforecastData);
    
    console.log(new Date(fiveforecastData.list[1].dt*1000))
    if (WeekDaySpecific ==true){
    
    } 

        
    
}
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------

async function OneCallAPI(url){
   
    
    let OCA = await fetch(url);
    let ocatData = await OCA.json();
    
    console.log('One Call API:')
    console.log(ocatData)
    currentMorn.innerText = Math.round(ocatData.daily[0].temp.morn)+ ' °F';
    currentEve.innerText = Math.round(ocatData.daily[0].temp.eve)+ ' °F';

    currentNight.innerText = Math.round(ocatData.daily[0].temp.night)+ ' °F';

    ChanceOfRain.innerText = ocatData.hourly[0].pop*100+"%";

    if (WeekDaySpecific ==true){
        let ForecastMorn = document.getElementById('forecasttMorn');
        let ForecastEve = document.getElementById('forecastEve');
        let ForecastNight = document.getElementById('forecastNight');

        let Icon_Morn = document.getElementById("Icon_Morn");
    let Icon_Eve = document.getElementById("Icon_Eve");
    let Icon_Nignt = document.getElementById("Icon_Night");

        

        let DayofTheWeek = document.getElementById('DayofTheWeek');
        let SpecificDOW = new Date(ocatData.daily[DayoWeekNum].dt*1000);

        
        DayofTheWeek.innerText = SpecificDOW.toLocaleString("en-US", {weekday: "long"});
        
        ForecastMorn.innerText = Math.round(ocatData.daily[1].temp.morn)+ ' °F';
        ForecastEve.innerText = Math.round(ocatData.daily[DayoWeekNum].temp.eve)+ ' °F';
        ForecastNight.innerText = Math.round(ocatData.daily[DayoWeekNum].temp.night)+ ' °F';

        Icon_Morn.src = 'http://openweathermap.org/img/wn/'+ocatData.daily[DayoWeekNum].weather[0].icon+"@2x.png"
        Icon_Eve.src = 'http://openweathermap.org/img/wn/'+ocatData.daily[DayoWeekNum].weather[0].icon+"@2x.png"
        Icon_Nignt.src = 'http://openweathermap.org/img/wn/'+(ocatData.daily[DayoWeekNum].weather[0].icon).substr(0, (ocatData.daily[DayoWeekNum].weather[0].icon).length-1)+'n'+"@2x.png"

        

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

    let IconDay1 = document.getElementById('IconDay1');
    let IconDay2 = document.getElementById('IconDay2');
    let IconDay3 = document.getElementById('IconDay3');
    let IconDay4 = document.getElementById('IconDay4');
    let IconDay5 = document.getElementById('IconDay5');

    let Day_2_High = document.getElementById('Day_2_High');
    let Day_3_High = document.getElementById('Day_3_High');
    let Day_4_High = document.getElementById('Day_4_High');
    let Day_5_High = document.getElementById('Day_5_High');
    
    let Day_1_Low = document.getElementById('Day_1_Low');
    let Day_2_Low = document.getElementById('Day_2_Low');
    let Day_3_Low = document.getElementById('Day_3_Low');
    let Day_4_Low = document.getElementById('Day_4_Low');
    let Day_5_Low = document.getElementById('Day_5_Low');

    Day_1_High.innerText = Math.round(ocatData.daily[1].temp.max)+" °F";
        Day_1_Low.innerText = Math.round(ocatData.daily[1].temp.min)+" °F";
        Day_2_High.innerText = Math.round(ocatData.daily[2].temp.max)+" °F";
        Day_2_Low.innerText = Math.round(ocatData.daily[2].temp.min)+" °F";
        Day_3_High.innerText = Math.round(ocatData.daily[3].temp.max)+" °F";
        Day_3_Low.innerText = Math.round(ocatData.daily[3].temp.min)+" °F";
        Day_4_High.innerText = Math.round(ocatData.daily[4].temp.max)+" °F";
        Day_4_Low.innerText = Math.round(ocatData.daily[4].temp.min)+" °F";
        Day_5_High.innerText = Math.round(ocatData.daily[5].temp.max)+" °F";
        Day_5_Low.innerText = Math.round(ocatData.daily[5].temp.min)+" °F";

    IconDay1.src = 'http://openweathermap.org/img/wn/'+ocatData.daily[1].weather[0].icon+"@2x.png";
        IconDay2.src = 'http://openweathermap.org/img/wn/'+ocatData.daily[2].weather[0].icon+"@2x.png";
        IconDay3.src = 'http://openweathermap.org/img/wn/'+ocatData.daily[3].weather[0].icon+"@2x.png";
        IconDay4.src = 'http://openweathermap.org/img/wn/'+ocatData.daily[4].weather[0].icon+"@2x.png";
        IconDay5.src = 'http://openweathermap.org/img/wn/'+ocatData.daily[5].weather[0].icon+"@2x.png";

    Date1.innerText = dateText1.toLocaleString("en-US", {month: "numeric"})+'/'+dateText1.toLocaleString("en-US", {day: "numeric"})+'/'+dateText1.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText1.toLocaleString("en-US", {weekday: "long"})
        Date2.innerText = dateText2.toLocaleString("en-US", {month: "numeric"})+'/'+dateText2.toLocaleString("en-US", {day: "numeric"})+'/'+dateText2.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText2.toLocaleString("en-US", {weekday: "long"})
        Date3.innerText = dateText3.toLocaleString("en-US", {month: "numeric"})+'/'+dateText3.toLocaleString("en-US", {day: "numeric"})+'/'+dateText3.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText3.toLocaleString("en-US", {weekday: "long"})
        Date4.innerText = dateText4.toLocaleString("en-US", {month: "numeric"})+'/'+dateText4.toLocaleString("en-US", {day: "numeric"})+'/'+dateText4.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText4.toLocaleString("en-US", {weekday: "long"})
        Date5.innerText = dateText5.toLocaleString("en-US", {month: "numeric"})+'/'+dateText5.toLocaleString("en-US", {day: "numeric"})+'/'+dateText5.toLocaleString("en-US", {year: "numeric"}).substr(-2)+"-"+dateText5.toLocaleString("en-US", {weekday: "long"})
    }



    
}




searchBTN.addEventListener('click', function(){
    if ( searchBar.value != ""){
        City = searchBar.value;
    console.log(City);
    currentWeather(url_pt1+City+'&units=imperial'+apikey);
    searchBar.value = "";
    WeeklyForecastInject(0);
    }
})
searchBar.addEventListener('keypress', function(e){
    if (e.code == "Enter" && e.target.value != '')
    {
        console.log(e.code)
        City = e.target.value;
    console.log(City);
    currentWeather(url_pt1+City+'&units=imperial'+apikey);
    e.target.value = '';
    WeeklyForecastInject(0);
    }
})

Day1.addEventListener('click',function(){

    DayoWeekNum = 1
    WeeDaySpecificInject(1);
    
});
Day2.addEventListener('click',function(){
    DayoWeekNum = 2
    WeeDaySpecificInject(1);
    
});
Day3.addEventListener('click',function(){
    DayoWeekNum = 3
    WeeDaySpecificInject(1);
    
});
Day4.addEventListener('click',function(){
    DayoWeekNum = 4
    WeeDaySpecificInject(1);
    
});
Day5.addEventListener('click',function(){
    DayoWeekNum = 5
    WeeDaySpecificInject(1);
    
});

async function WeeDaySpecificInject(inject){
    let WDF = await fetch('https://spreadsheets.google.com/feeds/list/1fOLTeJmKnZ_agfjH-qYr9VO7KfkXlUA7rKYBv86gwIo/1/public/full?alt=json');
    let WDFData = await WDF.json();
   
    InjHere.innerHTML = WDFData.feed.entry[inject].gsx$html.$t
    setTimeout(function(){  
    let GoBack = document.getElementById('GoBack');
    
    
    WeekDaySpecific = true;
    currentWeather(url_pt1+City+'&units=imperial'+apikey);
    
    GoBack.addEventListener('click',function(){
        WeeklyForecastInject(0)
    });
    }, 500);

    
}

async function WeeklyForecastInject(inject){
    let WDF = await fetch('https://spreadsheets.google.com/feeds/list/1fOLTeJmKnZ_agfjH-qYr9VO7KfkXlUA7rKYBv86gwIo/1/public/full?alt=json');
    let WDFData = await WDF.json();
    
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
    WeeDaySpecificInject(1);
    
});
Day2.addEventListener('click',function(){
    DayoWeekNum = 2
    WeeDaySpecificInject(1);
    
});
Day3.addEventListener('click',function(){
    DayoWeekNum = 3
    WeeDaySpecificInject(1);
    
});
Day4.addEventListener('click',function(){
    DayoWeekNum = 4
    WeeDaySpecificInject(1);
    
});
Day5.addEventListener('click',function(){
    DayoWeekNum = 5
    WeeDaySpecificInject(1);
    
});
    
    }, 500);
}




favBTN.addEventListener('click',function(e){
    let list = false;

    if (Favorites.length > 0){
        for (a = 0; a<Favorites.length; a++){
            
            if (Favorites[a] == LastCitySearched.toUpperCase()){
                list = true;
                Favorites.splice(a,1);
                document.getElementById(LastCitySearched.toUpperCase()).remove();
                console.log(LastCitySearched+" has been removed");
                localStorage.setItem("Favlist", JSON.stringify(Favorites))
                e.target.className = "far fa-star mt-2";
            }

        }
    }
    if (list == false){
        createFavBtn(LastCitySearched);
    addToFavorites(LastCitySearched);
    console.log(Favorites);
    e.target.className = "fas fa-star mt-2";

}
console.log(list);
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
        searchBar.value = "";
    currentWeather(url_pt1+City+'&units=imperial'+apikey);
    if (cityText.innerText != LastCitySearched.toUpperCase()){
        WeeklyForecastInject(0);
    }
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
                if (cityText.innerText != LastCitySearched.toUpperCase()){
                    WeeklyForecastInject(0);
                }
        })
        
    
        
        FavInject.appendChild(Column);
        Favorites.push(NFO[i]);
        //localStorage.setItem("Favlist", JSON.stringify(Favorites))
    }
}
