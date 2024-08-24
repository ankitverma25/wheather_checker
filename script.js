const api_key = "75496d48e783bfe8258fbc49f1dedffa";
let latitude;
let longitude;

navigator.geolocation.getCurrentPosition(success, error);

function success(pos) {
  const loc = pos.coords;
  latitude = loc.latitude;
  longitude = loc.longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      displayWeatherData(data);
      console.log("Weather data for current location:", data);
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
    });
}

function error(e) {
  console.log("Geolocation error:", e);
}

const search = document.querySelector('.search');
const city_name = document.querySelector('#city');

search.addEventListener("click", searchweather);

function searchweather() {
  const city = city_name.value.trim();

  if (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Weather data for city:", data);
      })
      .catch((error) => {
        console.log("Error fetching weather data for city:", error);
      });
  } else {
    console.log("Please enter a valid city name.");
  }
}


const weatherContainer = document.querySelector('.your-city-weather');

function displayWeatherData(data) {
  const city = data.name;
  const temp = data.main.temp;
  const tempMin = data.main.temp_min;
  const tempMax = data.main.temp_max;
  const feelsLike = data.main.feels_like;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  weatherContainer.innerHTML = `
    <h2>Weather in ${city}</h2>
    <p><strong>Temperature:</strong> ${temp}°C (Min: ${tempMin}°C, Max: ${tempMax}°C)</p>
    <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
    <p><strong>Weather:</strong> ${description}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    <p><strong>Sunrise:</strong> ${sunrise}</p>
    <p><strong>Sunset:</strong> ${sunset}</p>
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
  `;
}
