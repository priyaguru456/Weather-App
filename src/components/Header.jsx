import React from 'react'

export default function Header({ toggleUnits, units, handleUseMyLocation }) {
  return (
    <header className="header">
      <h1>🌤️ Weather App</h1>
      <div className="header-actions">
        <button onClick={toggleUnits} className="btn small">
          Switch to {units === 'metric' ? '°F' : '°C'}
        </button>
        <button onClick={handleUseMyLocation} className="btn small">
          Use my location
        </button>
      </div>
    </header>
  )
}
