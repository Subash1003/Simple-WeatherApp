const apiKey = "1273ff9ff3241685d06f129d50e71db1";


const input=document.getElementById("input");
const searchBtn=document.getElementById("search-btn");

const temperature=document.getElementById("temp");
const city=document.getElementById("cityname");
const country= document.getElementById("location");
const humidity=document.getElementById("humidity");
const wind= document.getElementById("wind");

city.innerText="Weather";

async function checkWeather(queryCity) {

     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(queryCity)}&appid=${apiKey}&units=metric`;

     try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        const data = await response.json();
        console.log(data);

        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        city.innerHTML = data.name , data.country;
        country.innerHTML = "Country, "+data.sys.country;
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
