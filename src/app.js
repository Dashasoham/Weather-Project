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

function showForecast(coordinates) {
  console.log(coordinates);
  let apiKey = '7d2f7439094688bc9a2723b3273f8711';

  let apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
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

  degreesCelcius = Math.round(response.data.main.temp);

  temperature.innerHTML = degreesCelcius;
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
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector('#search-form');
form.addEventListener('submit', formSubmission);

function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector('#typeTemp');
  let degreesFahrenheit = (degreesCelcius * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(degreesFahrenheit);
}

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector('#typeTemp');
  tempElement.innerHTML = degreesCelcius;
}

function getForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector('#forecast');
  let days = ['Thu', 'Fri', 'Sat', 'Sun'];

  let forecastHTML = '';

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="forecast">
  <div>
    <img
      src="images/rainy.png"
      id="images-column"
      alt="rainy"
      width="50"
    />${day}
  </div>
</div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let degreesCelcius = null;

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', showFahrenheit);

let CelsiusLink = document.querySelector('#celsius-link');
CelsiusLink.addEventListener('click', showCelsius);
