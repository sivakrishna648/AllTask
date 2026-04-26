import React, { useState } from "react";
import axios from "axios";

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
    <div style={{ textAlign: "center" }}>
      <h2>🌦 Weather App</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
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