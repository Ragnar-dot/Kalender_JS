async function fetchWeather() {
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Ersetze durch deinen API-Schlüssel
    const city = 'Kassel'; // Ersetze durch deine Stadt
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Wetterdaten');
    }
    return await response.json();
}

async function fetchWeatherIcon(iconCode) {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const response = await fetch(iconUrl);
    if (!response.ok) {
        throw new Error('Fehler beim Abrufen des Wetter-Icons');
    }
    
    // Direktes Setzen der Icon-URL im img-Tag statt Blob-URL
    return iconUrl;
}

function updateWeatherWidget(data) {
    const temperature = document.getElementById('temperature-display');
    const description = document.getElementById('description');
    const weatherAnimation = document.getElementById('weather-icon');
    
    
    // Wetter-Icon URL abrufen
    const iconCode = data.weather[0].icon;
    fetchWeatherIcon(iconCode).then(iconUrl => {
        const img = document.createElement('img');
        img.src = iconUrl;
        img.alt = data.weather[0].description;
        weatherAnimation.innerHTML = ''; // Entferne alte Inhalte
        weatherAnimation.appendChild(img);
    }).catch(error => {
        console.error('Fehler beim Abrufen des Wetter-Icons:', error);
    });

    temperature.textContent = `${Number.parseFloat(data.main.temp).toFixed(1)}°C`;
    description.textContent = data.weather[0].description;

    // Wetteranimation bereinigen
    weatherAnimation.innerHTML = ''; // Alte Animationen entfernen

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
    try {
        const weatherData = await fetchWeather();
        updateWeatherWidget(weatherData);
    } catch (error) {
        console.error('Fehler beim Initialisieren des Wetter-Widgets:', error);
    }
}

initWeatherWidget();
