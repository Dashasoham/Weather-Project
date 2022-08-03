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

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemperature);
  cityInput.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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
