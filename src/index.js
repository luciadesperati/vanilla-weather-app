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

function displayForecast(daysFromApi) {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<hr />
                  <div
                    class="pt-4 mt-3 row forecast d-flex"
                  >
                  <div class="col-1"></div>`;

  daysFromApi.forEach(function (currentDay) {
    // Day names forecast -> depending on date
    let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    console.log(weekDays);
    let forecastDays = "";
    // based on the current day > show 5 elements > possibly with the forEach?

    console.log(forecastDays);
    // Dates forecast > depending on date
    let forecastDates = new Date(currentDay.time * 1000);
    console.log(forecastDates);
    let startDay = weekDays[forecastDates.getDay()];
    console.log(startDay);

    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = forecastDates.getDate();
    console.log(date);

    let month = months[forecastDates.getMonth()];
    console.log(month);

    // Icons > depending on days
    let forecastWeatherIcon = currentDay.condition.icon_url;
    console.log(forecastWeatherIcon);

    // Temperature Max
    let forecastTempMax = Math.round(currentDay.temperature.maximum);
    console.log(forecastTempMax);

    // Temperature Min
    let forecastTempMin = Math.round(currentDay.temperature.minimum);
    console.log(forecastTempMin);

    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
                      <p class="weekday-list mb-0">${startDay}</p>
                      <p class="day-list">${date} ${month}</p>
                      <img
                        class="emoji-list"
                        id="weather-icon-list"
                        src="${forecastWeatherIcon}"
                      />
                      <span class="d-flex justify-content-center">
                      <p class="temperature-min">${forecastTempMin}</p>
                      <p class="temperature-max">${forecastTempMax}</p>
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

    let daysFromApi = data.data.daily;
    daysFromApi = daysFromApi.slice(0, 5);
    displayForecast(daysFromApi);
  }

  axios.get(apiUrl).then(showWeather);
}

form.addEventListener("submit", onSearchCity);
