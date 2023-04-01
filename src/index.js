let input = document.querySelector("#city-input");
let form = document.querySelector("#form");
let temp = document.querySelector("#temperature");
let cel = document.querySelector("#temp-cel");
let far = document.querySelector("#temp-far");
let city = document.querySelector("#city-name");
let dateDisplay = document.querySelector("#date-display");
let weatherIcon = document.querySelector("#weather-icon");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let currentTempCel = null;

// on click and on enter, update city name
function changeCity(event) {
  event.preventDefault();
  city.innerHTML = `${input.value}`;
}

form.addEventListener("submit", changeCity);

// // change temp when clicking on C or F
function changeTempFar() {
  temp.innerHTML = Math.round((currentTempCel * 9) / 5 + 32);
}

far.addEventListener("click", changeTempFar);

function changeTempCel() {
  temp.innerHTML = `${currentTempCel}`;
}
cel.addEventListener("click", changeTempCel);

// set today's date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes().toString().padStart(2, "0");
dateDisplay.innerHTML = `${day} ${hour}:${minutes}`;
let weatherDescription = document.querySelector("#weather-description");

// when search > show temp of searched city
function onSearchCity(event) {
  event.preventDefault();

  let searchedCity = `${input.value}`;
  let apiKey = "2b6be0a88f02eco343b0c579f343cbt9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${searchedCity}&key=${apiKey}&units=metric`;
  console.log(apiUrl);

  function showWeather(data) {
    console.log(data);
    let currentTemp = `${Math.round(data.data.daily[0].temperature.day)}`;
    console.log(currentTemp);
    temp.innerHTML = `${currentTemp}`;

    let currentWeatherDescription = data.data.daily[0].condition.description;
    weatherDescription.innerHTML = `${currentWeatherDescription}`;

    let currentWeatherIcon = data.data.daily[0].condition.icon_url;
    weatherIcon.src = `${currentWeatherIcon}`;
    console.log(currentWeatherIcon);

    let currentHumidity = data.data.daily[0].temperature.humidity;
    humidity.innerHTML = `${currentHumidity}`;

    let currentWind = `${Math.round(data.data.daily[0].wind.speed)}`;
    wind.innerHTML = `${currentWind}`;

    currentTempCel = currentTemp;
  }

  axios.get(apiUrl).then(showWeather);
}

form.addEventListener("submit", onSearchCity);
