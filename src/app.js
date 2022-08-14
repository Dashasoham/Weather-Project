let currentDate = new Date();
console.log(new Date());
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let day = days[currentDate.getDay()];
let hours = currentDate.getHours();
hours = hours <= 9 ? '0' + hours : hours;
let minutes = currentDate.getMinutes();
minutes = minutes <= 9 ? '0' + minutes : minutes;

let currentDay = document.querySelector('#showDate');
let currentTime = document.querySelector('#showTime');
currentDay.innerHTML = `${day}`;
currentTime.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days[day];
}

function getForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = '';

  forecast.slice(1).forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast">
  <div>
    <img
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png"
      id="images-column"
      alt=""
      width="50"
    />${formatDay(forecastDay.dt)} 
    <div class="forecast-temperature">
    <span class="forecast-temperature-max"> ${Math.round(
      forecastDay.temp.max
    )} | </span>
    <span class="forecast-temperature-min"> ${Math.round(
      forecastDay.temp.min
    )}° </span>
    </div>
  </div>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function showForecast(coordinates) {
  console.log(coordinates);
  let apiKey = '7d2f7439094688bc9a2723b3273f8711';

  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getForecast);
}

function displayTemperature(response) {
  console.log(response);
  let temperature = document.querySelector('#typeTemp');
  let cityInput = document.querySelector('#typeCity');
  let description = document.querySelector('#description');
  let humidity = document.querySelector('#humidity');
  let wind = document.querySelector('#wind');
  let icon = document.querySelector('#mainImage');

  degreesCelcius = response.data.main.temp;

  temperature.innerHTML = Math.round(degreesCelcius);
  cityInput.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  icon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  icon.setAttribute('alt', response.data.weather[0].description);

  showForecast(response.data.coord);
}

function formSubmission(event) {
  event.preventDefault();
  let city = document.querySelector('#city-input').value;
  apiKey = '7d2f7439094688bc9a2723b3273f8711';
  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}
function showCurrentTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector('#typeTemp');
  let description = document.querySelector('#description');
  let humidity = document.querySelector('#humidity');
  let wind = document.querySelector('#wind');
  let icon = document.querySelector('#mainImage');

  degreesCelcius = response.data.main.temp;

  tempElement.innerHTML = Math.round(degreesCelcius);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  icon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  icon.setAttribute('alt', response.data.weather[0].description);
  showForecast(response.data.coord);
}

let form = document.querySelector('#search-form');
form.addEventListener('submit', formSubmission);

apiKey = '7d2f7439094688bc9a2723b3273f8711';
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Donetsk&appid=${apiKey}&units=metric`;
axios.get(`${apiURL}&appid=${apiKey}`).then(showCurrentTemp);
