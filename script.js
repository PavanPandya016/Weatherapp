const apiKey = "87fbdf16ecda4b6f942190111251404";
const form = document.getElementById("city-form");
const cityInput = document.getElementById("city-input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    updateCardDefault();
  }
});

function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      updateCardData(data);
    })
    .catch(err => {
      alert("City not found or API error.");
      console.error(err);
      updateCardDefault();
    });
}

function updateCardData(data) {
  document.getElementById("city-name").textContent = data.location.name;
  document.getElementById("temp").textContent = `${data.current.temp_c}°C`;
  document.getElementById("wind").textContent = `${data.current.wind_kph} km/h`;
  document.getElementById("humidity").textContent = `${data.current.humidity}%`;
  document.getElementById("uv").textContent = `${data.current.uv}`;
  document.getElementById("rain").textContent = `${data.current.precip_mm}%`;
  document.getElementById("details").innerHTML = `Feels like: ${data.current.feelslike_c}° <span>${data.location.localtime.split(" ")[1]}</span>`;
  document.getElementById("description").textContent = `Weather condition: ${data.current.condition.text}`;
}

function updateCardDefault() {
  document.getElementById("city-name").textContent = "City";
  document.getElementById("temp").textContent = "--°C";
  document.getElementById("wind").textContent = "-- km/h";
  document.getElementById("humidity").textContent = "--%";
  document.getElementById("uv").textContent = "--";
  document.getElementById("rain").textContent = "--%";
  document.getElementById("details").innerHTML = `Feels like: --° <span>--:--</span>`;
  document.getElementById("description").textContent = `Weather condition: --`;
}
