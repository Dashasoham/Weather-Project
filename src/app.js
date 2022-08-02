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

function cityName(event) {
  event.preventDefault();
  let searchEngine = document.querySelector('#city-input');
  let myCity = document.querySelector('#typeCity');
  myCity.innerHTML = searchEngine.value;
}

function showTemperature(response) {
  console.log(response);
}

let apiKey = '7d2f7439094688bc9a2723b3273f8711';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

let form = document.querySelector('form');
form.addEventListener('submit', cityName);
