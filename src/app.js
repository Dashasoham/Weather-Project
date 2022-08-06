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
}

function formSubmission(event) {
  event.preventDefault();
  let city = document.querySelector('#city-input').value;
  apiKey = '263b1a06c461206364e0ad90f938400d';
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=263b1a06c461206364e0ad90f938400d&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector('#search-form');
form.addEventListener('submit', formSubmission);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = '7d2f7439094688bc9a2723b3273f8711';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

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

function getForecast() {
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = '';
  forecastHTML = `<div class="forecast">
  <div>
    <img
      src="images/rainy.png"
      id="images-column"
      alt="rainy"
      width="50"
    />Saturday
  </div>
</div>`;
  forecastElement.innerHTML = forecastHTML;
}

getForecast();
let degreesCelcius = null;

let displayCurrentCity = document.querySelector('#typeCity');
displayCurrentCity.addEventListener('click', getCurrentPosition);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', showFahrenheit);

let CelsiusLink = document.querySelector('#celsius-link');
CelsiusLink.addEventListener('click', showCelsius);
displayWeekDays();
