async function fetchWeather() {
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Ersetze durch deinen API-Schlüssel
    const city = 'Kassel'; // Ersetze durch deine Stadt
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function updateWeatherWidget(data) {
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherAnimation = document.getElementById('weather-animation');

    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = data.weather[0].description;

    weatherAnimation.innerHTML = ''; // Clear previous animation

    const weatherMain = data.weather[0].main.toLowerCase();
    if (weatherMain.includes('clear')) {
        const sun = document.createElement('div');
        sun.classList.add('sun');
        weatherAnimation.appendChild(sun);
    } else if (weatherMain.includes('rain')) {
        for (let i = 0; i < 10; i++) {
            const rainDrop = document.createElement('div');
            rainDrop.classList.add('rain');
            rainDrop.style.left = `${Math.random() * 100}%`;
            weatherAnimation.appendChild(rainDrop);
        }
    } else if (weatherMain.includes('wind')) {
        const wind = document.createElement('div');
        wind.classList.add('wind');
        weatherAnimation.appendChild(wind);
    } else if (weatherMain.includes('fog')) {
        const fog = document.createElement('div');
        fog.classList.add('fog');
        weatherAnimation.appendChild(fog);
    }
}

async function initWeatherWidget() {
    const weatherData = await fetchWeather();
    updateWeatherWidget(weatherData);
}

initWeatherWidget();