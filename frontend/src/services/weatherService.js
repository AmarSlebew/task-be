import api from './api'

const fallbackWeather = (city) => ({
  city,
  temperature: 27,
  weather: 'Berawan cerah',
})

export async function fetchWeatherByCity(city) {
  try {
    const { data } = await api.get(`/weather/${encodeURIComponent(city)}`)
    return data
  } catch (error) {
    return fallbackWeather(city)
  }
}

export async function fetchWeatherByCoords(lat, lon) {
  try {
    const { data } = await api.get('/weather/coords', { params: { lat, lon } })
    return data
  } catch (error) {
    return fallbackWeather('Lokasi Anda')
  }
}
