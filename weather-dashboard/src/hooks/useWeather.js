import { useState, useEffect } from 'react'
import {
  fetchCurrentWeather,
  fetchAirQuality,
  reverseGeocode,
} from '../services/weatherService'

/**
 * Fetches weather + air quality in parallel for given coords.
 * Re-fetches whenever lat/lon changes.
 */
export function useWeather(coords) {
  const [data, setData] = useState({ weather: null, airQuality: null, cityName: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!coords) return

    const { lat, lon } = coords
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [weather, airQuality, cityName] = await Promise.all([
          fetchCurrentWeather(lat, lon),
          fetchAirQuality(lat, lon),
          reverseGeocode(lat, lon),
        ])
        if (!cancelled) {
          setData({ weather, airQuality, cityName })
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch weather data')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [coords?.lat, coords?.lon])

  return { ...data, loading, error }
}
