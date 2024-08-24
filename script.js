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

const container = document.createElement('div');
container.textContent = "Weather Data Container";
