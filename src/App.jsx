import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { fetchWeatherByCity, fetchWeatherByCoords } from './services/weatherApi'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [units, setUnits] = useState('metric')

  async function handleSearch(query) {
    setError('')
    setLoading(true)
    try {
      const data = await fetchWeatherByCity(query, units)
      setWeather(data)
    } catch (err) {
      setWeather(null)
      setError(err.message || 'Could not find weather for that location')
    } finally {
      setLoading(false)
    }
  }

  async function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }
    setError('')
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const data = await fetchWeatherByCoords(latitude, longitude, units)
          setWeather(data)
        } catch (err) {
          setWeather(null)
          setError(err.message || 'Failed to fetch weather by location')
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        setLoading(false)
        setError(err.message || 'Failed to access your location')
      }
    )
  }

  async function toggleUnits() {
    const newUnits = units === 'metric' ? 'imperial' : 'metric'
    setUnits(newUnits)
    if (weather?.name) {
      try {
        setLoading(true)
        const data = await fetchWeatherByCity(weather.name, newUnits)
        setWeather(data)
      } catch (err) {
        setError(err.message || 'Failed to convert units')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="app">
      {/* Header Component */}
      <Header
        toggleUnits={toggleUnits}
        units={units}
        handleUseMyLocation={handleUseMyLocation}
      />

      {/* Main Content */}
      <main className="container">
        <SearchBar onSearch={handleSearch} />

        {loading && <div className="info">Loading…</div>}
        {error && <div className="error">{error}</div>}
        {weather && <WeatherCard data={weather} units={units} />}

        {!weather && !loading && !error && (
          <div className="hint">
            Try searching for a city above (e.g., "Mumbai").
          </div>
        )}
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
