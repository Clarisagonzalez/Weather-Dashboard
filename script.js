const apiKey = '1e667e51dc27633488cd24334bf4d347';

const defaultCity = 'Miami';

const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const searchHistory = document.getElementById('search-history');

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityName = cityInput.value.trim();

    if (cityName) {
        addToSearchHistory(cityName);
        fetchWeatherData(cityName);
    }
    cityInput.value = '';
});

function addToSearchHistory(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.classList.add('search-history-item');
    listItem.addEventListener('click', () => {
        fetchWeatherData(city);
    });
    searchHistory.appendChild(listItem);
}

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then((data) => {
            displayCurrentWeather(data); 
            displayFutureWeather(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function displayCurrentWeather(data) {
    const cityName = data.city.name;
    const currentDate = new Date(data.list[0].dt * 1000).toLocaleString();
    const temperature = data.list[0].main.temp;
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;
    const iconCode = data.list[0].weather[0].icon;
    const weatherDescription = data.list[0].weather[0].description;

    const cityNameElement = document.getElementById('city-name');
    const dateElement = document.getElementById('date');
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const iconElement = document.getElementById('weather-icon');
    const descriptionElement = document.getElementById('weather-description');

    cityNameElement.textContent = `City: ${cityName}`;
    dateElement.textContent = `Date: ${currentDate}`;
    temperatureElement.textContent = `Temperature: ${temperature} °C`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
    iconElement.src = `https://openweathermap.org/img/w/${iconCode}.png`;
    descriptionElement.textContent = `Description: ${weatherDescription}`;
}

function displayFutureWeather(data) {
    const forecastContainer = document.getElementById('5-day-forecast');

    forecastContainer.innerHTML = '';


    for (let i = 1; i <= 5; i++) {
        const forecast = data.list[i * 8];


        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');

    
        const dateElement = document.createElement('div');
        const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
        dateElement.textContent = `Date: ${forecastDate}`;

       
        const iconElement = document.createElement('img');
        iconElement.src = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        iconElement.alt = 'Weather Icon';

    
        const temperatureElement = document.createElement('div');
        temperatureElement.textContent = `Temperature: ${forecast.main.temp} °C`;

        const windSpeedElement = document.createElement('div');
        windSpeedElement.textContent = `Wind Speed: ${forecast.wind.speed} m/s`;

        const humidityElement = document.createElement('div');
        humidityElement.textContent = `Humidity: ${forecast.main.humidity}%`;

    
        dayElement.appendChild(dateElement);
        dayElement.appendChild(iconElement);
        dayElement.appendChild(temperatureElement);
        dayElement.appendChild(windSpeedElement);
        dayElement.appendChild(humidityElement);

        
        forecastContainer.appendChild(dayElement);
    }
}
fetchWeatherData(defaultCity);
