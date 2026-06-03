const apiKey = "1273ff9ff3241685d06f129d50e71db1";

const video = document.getElementById("bg-video")

const input = document.getElementById("input");
const clear = document.getElementById("clear");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temp");
const city = document.getElementById("cityname");
const country = document.getElementById("country");
const weathercondition = document.getElementById("weathercondition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const timeStatus = document.getElementById("time-status");
const sunriseTimeEl = document.getElementById("sunrise-time");
const sunsetTimeEl = document.getElementById("sunset-time");

city.innerText = "Weather";


function updateWeatherImage(condition) {

    switch (condition) {

        case "Clear":
            weatherIcon.src = "./images/clear.svg";
            break;

        case "Haze":
            weatherIcon.src = "./images/haze.svg";
            break;

        case "Mist":
            weatherIcon.src = "./images/mist.svg";
            break;

        case "Clouds":
            weatherIcon.src = "./images/overcast.svg";
            break;

        case "Rain":
        case "Drizzle":
            weatherIcon.src = "./images/rain.svg";
            break;

        case "Thunderstorm":
            weatherIcon.src = "./images/thunder.svg";
            break;

        case "Snow":
            weatherIcon.src = "./images/snow.svg";
            break;

        case "Smoke":
            weatherIcon.src = "./images/smoke.svg";
            break;

        default:
            weatherIcon.src = "./images/clear.svg";
    }
}

function getCountryName(countryCode) {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
}


function formatTime(unixTime, timezoneOffset) {

    const date = new Date((unixTime + timezoneOffset) * 1000);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
    });
}

async function checkWeather(queryCity) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(queryCity)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        const data = await response.json();
        console.log(data);

        const currentTime = Math.floor(Date.now() / 1000);
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        const timezoneOffset = data.timezone;
        const isNight = currentTime < sunrise || currentTime > sunset;
        console.log("Night Time:", isNight);

        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        city.innerHTML = data.name + ", ";
        country.innerHTML = getCountryName(data.sys.country);
        weathercondition.innerHTML = data.weather[0].description;
        humidity.innerHTML = data.main.humidity + " %";
        wind.innerHTML = Math.round(data.wind.speed * 3.6) + " km/hr";

       timeStatus.innerHTML =
         `${isNight ? "🌙 Night" : "🌞 Day"} | ${formatTime(currentTime, timezoneOffset)}`;

        sunriseTimeEl.innerHTML = formatTime(sunrise, timezoneOffset);

        sunsetTimeEl.innerHTML = formatTime(sunset, timezoneOffset);


        if (data.weather[0].main === "Clear") {
            video.src = isNight
                ? "./videos/background-video-Clear-Night.mp4"
                : "./videos/background-video-Clear.mp4"
        }
        else if (data.weather[0].main === "Clouds") {
            video.src = isNight
                ? "./videos/background-video-Smoke.mp4"
                : "./videos/background-video-Cloud.mp4"
        }
        else if (data.weather[0].main === "Rain") {
            video.src = "./videos/background-video-Rain.mp4"
        }
        else if (data.weather[0].main === "Smoke") {
            video.src = "./videos/background-video-Smoke.mp4"
        }
        else if (data.weather[0].main === "Haze" || data.weather[0].main === "Mist") {
            video.src = "./videos/background-video-Smoke.mp4"
        }
        else if (data.weather[0].main === "Snow") {
            video.src = "./videos/background-video-Snow.mp4"
        }


        if (data.weather[0].main === "Clear") {

            weatherIcon.src = isNight
                ? "./images/clear-night.svg"
                : "./images/clear.svg";

        }
        else if (data.weather[0].main === "Clouds") {

            weatherIcon.src = isNight
                ? "./images/overcast-night.svg"
                : "./images/few-clouds.svg";

        }
        else {

            updateWeatherImage(data.weather[0].main);

        }

    } catch (err) {
        console.error(err);
        temperature.innerHTML = "";
        city.innerHTML = "please enter the city ";
        country.innerHTML = ""
        humidity.innerHTML = "";
        wind.innerHTML = "";
        timeStatus.innerHTML=""
        sunriseTimeEl.innerHTML = "";
        sunsetTimeEl.innerHTML = "";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(input.value);
});


input.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        checkWeather(input.value);
    }

});

clear.addEventListener("click", () => {
    input.value = "";
})

checkWeather("coimbatore");
