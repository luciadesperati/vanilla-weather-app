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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<hr />
                  <div
                    class="pt-4 mt-3 row forecast d-flex"
                  >
                  <div class="col-1"></div>`;

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
                      <p class="weekday-list mb-0">${day}</p>
                      <p class="day-list">6 Mar</p>
                      <img
                        class="emoji-list"
                        id="weather-icon-list"
                        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                      />
                      <span class="d-flex justify-content-center">
                        <p class="temperature-max">23</p>
                        <p class="temperature-min">23</p>
                      </span>
                    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// when search > show temp of searched city
function onSearchCity(event) {
  event.preventDefault();

  let searchedCity = `${input.value}`;
  let apiKey = "2b6be0a88f02eco343b0c579f343cbt9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${searchedCity}&key=${apiKey}&units=metric`;
  console.log(apiUrl);

  displayForecast();

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
