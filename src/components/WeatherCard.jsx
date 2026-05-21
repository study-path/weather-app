function WeatherCard({ data }) {
  const { name, sys, main, weather, wind, visibility } = data
  const icon = weather[0].icon
  const description = weather[0].description

  const formatTime = (unix) => {
    const d = new Date(unix * 1000)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const mpsToKmh = (mps) => Math.round(mps * 3.6)

  return (
    <div className="weather-card">
      <div className="card-header">
        <div className="location">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>{name}, {sys.country}</span>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="weather-icon"
        />
      </div>

      <div className="temp-section">
        <span className="temp">{Math.round(main.temp)}°C</span>
        <span className="description">{description}</span>
      </div>

      <div className="feels-like">
        Feels like {Math.round(main.feels_like)}°C &nbsp;·&nbsp;
        High {Math.round(main.temp_max)}° / Low {Math.round(main.temp_min)}°
      </div>

      <div className="stats-grid">
        <Stat label="Humidity" value={`${main.humidity}%`} icon="💧" />
        <Stat label="Wind" value={`${mpsToKmh(wind.speed)} km/h`} icon="💨" />
        <Stat label="Visibility" value={`${(visibility / 1000).toFixed(1)} km`} icon="👁️" />
        <Stat label="Pressure" value={`${main.pressure} hPa`} icon="🌡️" />
        <Stat label="Sunrise" value={formatTime(sys.sunrise)} icon="🌅" />
        <Stat label="Sunset" value={formatTime(sys.sunset)} icon="🌇" />
      </div>
    </div>
  )
}

function Stat({ label, value, icon }) {
  return (
    <div className="stat">
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default WeatherCard
