const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "3b25d17acf02c0482f0ad00e907b96ec" ;
const searchInput = document.querySelector("input") ;
const searchButton = document.querySelector("button") ;

const getCurrentWeatherByName = (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`;
    console.log(url)
}

const searchHandler = () => {
    const cityName = searchInput.value 

    if(!cityName) {
        alert("Please Enter City Name") ;
    }
    getCurrentWeatherByName(cityName);
};

searchButton.addEventListener("click", searchHandler) ;