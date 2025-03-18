const apiKey = "0cd9e32a45f54f60d361b55e2b42f443";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherDiv = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    
    const data = await response.json();
    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind: " + data.wind.speed + " km/h";
    document.querySelector(".description").innerHTML = data.weather[0].description;
    
    // Set weather icon based on weather condition
    const weatherCode = data.weather[0].id;
    if (weatherCode >= 200 && weatherCode <= 232) {
      weatherIcon.innerHTML = "⛈️";
    } else if (weatherCode >= 300 && weatherCode <= 321) {
      weatherIcon.innerHTML = "🌧️";
    } else if (weatherCode >= 500 && weatherCode <= 531) {
      weatherIcon.innerHTML = "🌧️";
    } else if (weatherCode >= 600 && weatherCode <= 622) {
      weatherIcon.innerHTML = "🌨️";
    } else if (weatherCode >= 701 && weatherCode <= 781) {
      weatherIcon.innerHTML = "🌫️";
    } else if (weatherCode === 800) {
      weatherIcon.innerHTML = "☀️";
    } else {
      weatherIcon.innerHTML = "☁️";
    }
    
    weatherDiv.classList.add("active");
  } catch (error) {
    console.error("Error:", error);
    alert("Please enter a valid city name");
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

// Initial weather check for a default city
checkWeather("Delhi");