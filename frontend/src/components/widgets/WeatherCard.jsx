import { useEffect, useState } from 'react'
import Card from '../common/Card'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import { fetchWeatherByCity, fetchWeatherByCoords } from '../../services/weatherService'

const fallbackCity = 'Jakarta'

export default function WeatherCard() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude)
          setWeather(data)
          setCity(data.city)
        } catch (error) {
          setStatus(error.message)
        }
      },
      () => {
        setStatus('Izin lokasi ditolak, gunakan input kota manual.')
      }
    )
  }, [])

  const handleSearch = async () => {
    const target = city.trim() || fallbackCity
    try {
      const data = await fetchWeatherByCity(target)
      setWeather(data)
      setStatus('')
    } catch (error) {
      setStatus(error.message)
    }
  }

  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-mist/60">Weather Today</p>
          <h3 className="text-lg font-semibold text-white">Cuaca Realtime</h3>
          <p className="text-xs text-mist/70">Input kota manual tersedia jika lokasi ditolak.</p>
        </div>
        <span className="rounded-full bg-gradient-to-r from-accent/30 to-primary/30 px-3 py-1 text-xs text-mist border border-white/10">Live</span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <TextInput
            label="Kota"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Masukkan kota"
          />
        </div>
        <Button onClick={handleSearch} className="px-4 py-3">
          Cari
        </Button>
      </div>

      {status && <p className="text-xs text-amber/80">{status}</p>}

      {weather ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white shadow-inner">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-wide text-mist/70">{weather.city}</p>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-mist border border-white/10">{weather.weather}</span>
          </div>
          <p className="mt-2 text-4xl font-bold">{Math.round(weather.temperature)}°C</p>
          <p className="text-xs text-mist/60">Terakhir diperbarui realtime</p>
        </div>
      ) : (
        <p className="text-sm text-mist/70">Masukkan nama kota untuk melihat cuaca.</p>
      )}
    </Card>
  )
}
