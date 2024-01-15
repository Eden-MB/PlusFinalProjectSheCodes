function showCity(response) {
  let temperatureID = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#cityName");
  let cc = document.querySelector(".cc");
  let humidity = document.querySelector("#humidity");
  let describe = document.querySelector("#describe");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector(".hey");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  describe.innerHTML = response.data.condition.description;
  wind.innerHTML = `${response.data.wind.speed}km/hr`;
  cityElement.innerHTML = response.data.city;
  temperatureID.innerHTML = temperature;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="hey" />`;
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showCity);
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedenesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];

  let dateAndTime = document.querySelector("#dateTime");
  dateAndTime.innerHTML = `${day} ${hours}:${minutes},`;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weatherForecast">
        <div class="forecastDate">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="forecastIcon" />
        <div class="forecastTemperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#sidebar");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#searchCity");
form.addEventListener("submit", handleSearchSubmit);

searchCity("Addis Ababa");
