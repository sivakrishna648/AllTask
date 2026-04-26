import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");
      const res = await axios.get(
        `http://localhost:5000/api/weather?city=${city}`
      );
      setData(res.data);
    } catch (err) {
      setError("City not found or server error");
    }
  };

  return (
    <div className="weather-container">
      <h2>🌦 Weather App</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <br />

      <button onClick={getWeather}>Search</button>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="weather-result">
          <h3>{data.city}</h3>
          <p>🌡 Temp: {data.temperature} °C</p>
          <p>💧 Humidity: {data.humidity}%</p>
          <p>☁ {data.description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;