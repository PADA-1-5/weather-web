// ============================================
// FETCH API LEARNING TEMPLATE
// ============================================
// This template demonstrates how to use the Fetch API
// Students can customize this code to practice

// Get DOM elements
const cityInput = document.getElementById('cityInput');
const fetchBtn = document.getElementById('fetchBtn');
const resultSection = document.getElementById('resultSection');

// ============================================
// EXAMPLE 1: Basic Fetch with .then()
// ============================================
// This is the traditional way using promises
function fetchWithThen() {
    fetch('https://api.example.com/data')
        .then(response => {
            // Check if the response is OK (status 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse JSON response
            return response.json();
        })
        .then(data => {
            // Use the data
            console.log('Data received:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
}

// ============================================
// EXAMPLE 2: Fetch with Async/Await (Recommended)
// ============================================
// This is the modern, more readable way
async function fetchWithAsyncAwait(url) {
    try {
        // Make the fetch request
        const response = await fetch(url);
        
        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON data
        const data = await response.json();
        
        return data;
    } catch (error) {
        // Handle any errors
        console.error('Fetch error:', error);
        throw error;
    }
}

// ============================================
// WEATHER API EXAMPLE - Using Free Open-Meteo API
// ============================================
// This function fetches weather data for a city
// Open-Meteo is completely FREE and requires NO API KEY!
// Learn more at: https://open-meteo.com/

async function fetchWeatherData(cityName) {
    try {
        showLoading();
        
        // Step 1: Get city coordinates using Open-Meteo Geocoding API (free, no key needed)
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
        
        const geocodeData = await fetchWithAsyncAwait(geocodeUrl);
        
        // Check if city was found
        if (!geocodeData.results || geocodeData.results.length === 0) {
            throw new Error(`City "${cityName}" not found. Please check the spelling.`);
        }
        
        const location = geocodeData.results[0];
        const latitude = location.latitude;
        const longitude = location.longitude;
        const city = location.name;
        const country = location.country || '';
        
        // Step 2: Get weather data using Open-Meteo Weather API (free, no key needed)
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=ms`;
        
        const weatherData = await fetchWithAsyncAwait(weatherUrl);
        
        // Combine location and weather data
        const combinedData = {
            city: city,
            country: country,
            temperature: Math.round(weatherData.current.temperature_2m),
            humidity: weatherData.current.relative_humidity_2m,
            windSpeed: Math.round(weatherData.current.wind_speed_10m * 10) / 10,
            weatherCode: weatherData.current.weather_code,
            description: getWeatherDescription(weatherData.current.weather_code)
        };
        
        // Display the weather data
        displayWeather(combinedData);
        
    } catch (error) {
        showError(`Failed to fetch weather data. ${error.message}`);
    }
}

// Helper function to convert weather code to description
function getWeatherDescription(code) {
    // Weather codes from WMO (World Meteorological Organization)
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    
    return weatherCodes[code] || 'Unknown';
}

// ============================================
// ALTERNATIVE: Using a Public API (No Key Required)
// ============================================
// For testing without an API key, you can use this example
// with JSONPlaceholder or other public APIs

async function fetchPublicData() {
    try {
        // Example: Fetching from JSONPlaceholder (no API key needed)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        console.log('Public API Data:', data);
        
        // You can display this data in your UI
        return data;
        
    } catch (error) {
        console.error('Error fetching public data:', error);
        throw error;
    }
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

function showLoading() {
    resultSection.innerHTML = '<div class="loading">Fetching weather data</div>';
    fetchBtn.disabled = true;
}

function showError(message) {
    resultSection.innerHTML = `
        <div class="error-message">
            <strong>Error:</strong> ${message}
            <br><br>
            <small>Tip: Make sure you've entered a valid city name</small>
        </div>
    `;
    fetchBtn.disabled = false;
}

function displayWeather(data) {
    // Extract weather information from the combined data
    const cityName = data.city;
    const country = data.country;
    const temperature = data.temperature;
    const description = data.description;
    const humidity = data.humidity;
    const windSpeed = data.windSpeed;
    
    // Create HTML to display the weather
    resultSection.innerHTML = `
        <div class="weather-card">
            <div class="weather-header">
                <div>
                    <div class="city-name">${cityName}${country ? ', ' + country : ''}</div>
                    <div style="color: #666; margin-top: 5px; text-transform: capitalize;">
                        ${description}
                    </div>
                </div>
                <div class="temperature">${temperature}°C</div>
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${humidity}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${windSpeed} m/s</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Weather Code</div>
                    <div class="detail-value">${data.weatherCode}</div>
                </div>
            </div>
        </div>
    `;
    
    fetchBtn.disabled = false;
}

// ============================================
// EVENT LISTENERS
// ============================================

// Handle button click
fetchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    
    if (city === '') {
        showError('Please enter a city name');
        return;
    }
    
    fetchWeatherData(city);
});

// Handle Enter key press
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchBtn.click();
    }
});

// ============================================
// PRACTICE EXERCISES FOR STUDENTS
// ============================================
// Try these challenges to practice:

// 1. Add error handling for empty city input
// 2. Add a loading spinner animation
// 3. Fetch data from a different API (e.g., JSONPlaceholder)
// 4. Add more weather details (pressure, visibility, etc.)
// 5. Store the last searched city in localStorage
// 6. Add a "Clear" button to reset the search
// 7. Fetch weather for multiple cities and display them
// 8. Add error handling for invalid city names
// 9. Create a function to format the date/time
// 10. Add icons for different weather conditions

