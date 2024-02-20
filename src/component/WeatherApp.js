import React, { useState, useEffect } from 'react';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city !== '') {
      setLoading(true);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=627383767fdaa6823b05b50fd1dce6b6`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
        });
    }
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].main}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default WeatherApp;
