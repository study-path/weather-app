import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const API_KEY = "20b6f5f823b41921ae01ac2000bdc0b2";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      );
      if (!res.ok) {
        if (res.status === 404)
          throw new Error("City not found. Please check the spelling.");
        if (res.status === 401)
          throw new Error(
            "API key not yet active. New keys take up to 2 hours to activate — please try again shortly.",
          );
        throw new Error(`Request failed (${res.status}). Please try again.`);
      }
      const data = await res.json();

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-default">
      <div className="overlay" />
      <div className="container">
        <h1 className="title">Weather Scope</h1>
        <SearchBar onSearch={fetchWeather} loading={loading} />
        {error && <p className="error">{error}</p>}
        {weather && <WeatherCard data={weather} />}
        {!weather && !error && !loading && (
          <p className="hint">Search for a city to see the current weather</p>
        )}
      </div>
    </div>
  );
}

export default App;
