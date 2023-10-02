const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "3b25d17acf02c0482f0ad00e907b96ec" ;
const searchInput = document.querySelector("input") ;
const searchButton = document.querySelector("button") ;
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");

const getCurrentWeatherByName = async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json() ;
    return json ;
}

const getCurrentWeatherByCoordinates = async (lat, lon) => {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json() ;
    return json ;
}

const getForecastWeatherByName = async (city) => {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json() ;
    return json ;
}


const renderCurrentWeather = (data) => {
    const weatherJSx = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
      <img alt="weather icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
      <span>${data.weather[0].main}</span>
      <p>${Math.round(data.main.temp)} °C</p>
     </div>
     <div id="info">
      <p>Humidity: <span>${data.main.humidity} %</span></p>
      <p>Wind: <span>${data.wind.speed} m/s</span></p>
     </div>
    `;

    weatherContainer.innerHTML = weatherJSx ;
};

const renderForecastWeather = (data) => {
    data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
    console.log(data)
}

const searchHandler = async () => {
    const cityName = searchInput.value 

    if(!cityName) {
        alert("Please Enter City Name") ;
    }
    const currentData = await getCurrentWeatherByName(cityName);
    renderCurrentWeather(currentData);
    const forecastData = await getForecastWeatherByName(cityName);
    renderForecastWeather(forecastData) ;
};

const positionCallback = async (position) => {
    const { latitude, longitude} = position.coords;
    const currentsData = await getCurrentWeatherByCoordinates(latitude,longitude);
    renderCurrentWeather(currentsData) ;
}

const errorCallback = (error) => {
    console.log(error) ;
}

const locationHandler = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionCallback,errorCallback)
    } else {
        alert("Your Browser does not support geoloaction")
    }
}


searchButton.addEventListener("click", searchHandler) ;

locationIcon.addEventListener("click", locationHandler) ;