const inputBox = document.querySelector('.inputBox');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weatherImg');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('windSpeed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){

    const api_key = "d5467220bad6c594225519485f420bd1";
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());
    console.log(weather_data);


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
        weatherImg.src = "/cloud.png";
            break;
        case 'Clear':
        weatherImg.src = "/clear.png";
            break;
        case 'Rain':
        weatherImg.src = "/rain.png";
            break;
        case 'Mist':
        weatherImg.src = "/mist.png";
            break;
        case 'Snow':
        weatherImg.src = "/snow.png";
            break;

    }

    console.log(weather_data);
 }


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});