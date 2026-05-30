const apiKey = "1273ff9ff3241685d06f129d50e71db1";

const input=document.getElementById("input");
const clear=document.getElementById("clear");
const searchBtn=document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const temperature=document.getElementById("temp");
const city=document.getElementById("cityname");
const country=document.getElementById("country");
const weathercondition= document.getElementById("weathercondition");
const humidity=document.getElementById("humidity");
const wind= document.getElementById("wind");

city.innerText="Weather";

function updateWeatherImage(condition){

    switch(condition){

        case "01d":
            weatherIcon.src = "./images/clear.svg";
            break;

        case "04d":
            weatherIcon.src = "./images/haze.svg";
            break;

        case "02d":
        case "03d":
            weatherIcon.src = "./images/mist.svg";
            break;

        case "04d":
        case "04n":
            weatherIcon.src = "./images/overcast.svg";
            break;

        case "10d":
        case "09d":
            weatherIcon.src = "./images/rain.svg";
            break;

        case "11d":
        case "11n":
            weatherIcon.src = "./images/thunder.svg";
            break;
            
            case "13d":
            case "13n":
             weatherIcon.src = "./images/snow.svg";
            break;
                
            case "50d":
            case "50n":
            weatherIcon.src = "./images/smoke.svg";
            break;

        case "50d":
        case "50n":
            weatherIcon.src = "./images/haze.svg";
            break;

        default:
            weatherIcon.src = "./images/clear.svg";
    }
}

async function checkWeather(queryCity) {

     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(queryCity)}&appid=${apiKey}&units=metric`;

     try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        const data = await response.json();
        console.log(data);

        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        city.innerHTML = data.name+", ";
        country.innerHTML= data.sys.country;
        weathercondition.innerHTML = data.weather[0].description;
        updateWeatherImage(data.weather[0].icon);
        humidity.innerHTML = data.main.humidity + " %";
        wind.innerHTML = Math.round(data.wind.speed * 3.6) + " km/hr";
     } catch (err) {
        console.error(err);
        temperature.innerHTML = "--";
        city.innerHTML = "City not found";
        country.innerHTML = ""
        humidity.innerHTML = "--%";
        wind.innerHTML = "-- km/hr";
     }
}

searchBtn.addEventListener("click", () => {
    checkWeather(input.value);
});


input.addEventListener("keypress", (event) => {

    if(event.key === "Enter"){
        checkWeather(input.value);
    }

});

clear.addEventListener("click",() =>{
    input.value="";
})

checkWeather("delhi");
