let input = document.querySelector("#city-input");
let form = document.querySelector("#form");
let temp = document.querySelector("#temperature");
let cel = document.querySelector("#temp-cel");
let far = document.querySelector("#temp-far");
let city = document.querySelector("#city-name");
let dateDisplay = document.querySelector("#date-display");

// on click and on enter, update city name
function changeCity(event) {
  event.preventDefault();
  city.innerHTML = `${input.value}`;
}

form.addEventListener("submit", changeCity);

// change temp when clicking on C or F
function changeTempFar() {
  temp.innerHTML = "66";
}

far.addEventListener("click", changeTempFar);

function changeTempCel() {
  temp.innerHTML = "19";
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

// when search > show temp of searched city
function onSearchCity(event) {
  event.preventDefault();

  let searchedCity = `${input.value}`;
  let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  function showTemp(data) {
    let currentTemp = `${Math.round(data.data.main.temp)}°C`;
    console.log(currentTemp);

    temp.innerHTML = `${currentTemp}`;
  }

  axios.get(apiUrl).then(showTemp);
}

form.addEventListener("submit", onSearchCity);

function currentCity() {
  //function replace data
  function replaceData(data) {
    //replace city based on position from API
    let currentCityName = data.data.name;
    city.innerHTML = `${currentCityName}`;

    //replace temp based on position from API
    let currentCityTemp = Math.round(data.data.main.temp);
    temp.innerHTML = `${currentCityTemp}`;
  }

  // find current position > API lat/lon
  function handlePosition(position) {
    let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(replaceData);
  }

  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-position");
currentButton.addEventListener("click", currentCity);
