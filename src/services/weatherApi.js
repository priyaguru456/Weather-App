// Basic wrapper for OpenWeatherMap current weather endpoint
export async function fetchWeatherByCity(city, units = 'metric') {
const key = import.meta.env.VITE_WEATHER_API_KEY
if (!key) throw new Error('Missing API key. Add VITE_WEATHER_API_KEY to .env')


const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
city
)}&units=${units}&appid=${key}`


const res = await fetch(url)
const data = await res.json()


if (!res.ok) {
// OpenWeatherMap returns a message field on errors
throw new Error(data.message || 'Failed to fetch weather')
}


return data
}


// Optional helper to fetch by coordinates
export async function fetchWeatherByCoords(lat, lon, units = 'metric') {
const key = import.meta.env.VITE_WEATHER_API_KEY
if (!key) throw new Error('Missing API key. Add VITE_WEATHER_API_KEY to .env')


const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`
const res = await fetch(url)
const data = await res.json()
if (!res.ok) throw new Error(data.message || 'Failed to fetch weather')
return data
}