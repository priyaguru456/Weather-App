import React from 'react'


export default function WeatherCard({ data, units = 'metric' }) {
    if (!data) return null


    const tempUnit = units === 'metric' ? '°C' : '°F'
    const windUnit = units === 'metric' ? 'm/s' : 'mph'
    const iconCode = data.weather?.[0]?.icon
    const description = data.weather?.[0]?.description || ''


    return (
        <div className="card">
            <div className="card-header">
                <h2>{data.name}, {data.sys?.country}</h2>
                <p className="desc">{description}</p>
            </div>


            <div className="card-main">
                {iconCode && (
                    <img
                        alt={description}
                        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                        width="100"
                        height="100"
                    />
                )}


                <div className="temps">
                    <div className="temp">{Math.round(data.main.temp)}{tempUnit}</div>
                    <div className="feels">Feels like {Math.round(data.main.feels_like)}{tempUnit}</div>
                </div>
            </div>


            <div className="card-details">
                <div>Humidity: {data.main.humidity}%</div>
                <div>Wind: {data.wind?.speed} {windUnit}</div>
                <div>Pressure: {data.main?.pressure} hPa</div>
            </div>


            <div className="card-footer">
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    View on map
                </a>
            </div>
        </div>
    )
}