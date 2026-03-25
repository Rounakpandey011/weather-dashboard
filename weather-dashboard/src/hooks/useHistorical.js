import { useState, useCallback } from 'react'
import { fetchHistoricalWeather, fetchHistoricalAirQuality } from '../services/weatherService'

/**
 * Lazily fetches historical data when `fetch` is called.
 * Not triggered on mount — user controls via date picker.
 */
export function useHistorical(coords) {
  const [data, setData] = useState({ weather: null, airQuality: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(
    async (startDate, endDate) => {
      if (!coords) return
      setLoading(true)
      setError(null)
      try {
        const [weather, airQuality] = await Promise.all([
          fetchHistoricalWeather(coords.lat, coords.lon, startDate, endDate),
          fetchHistoricalAirQuality(coords.lat, coords.lon, startDate, endDate),
        ])
        setData({ weather, airQuality })
      } catch (err) {
        setError(err.message || 'Failed to fetch historical data')
      } finally {
        setLoading(false)
      }
    },
    [coords?.lat, coords?.lon]
  )

  return { ...data, loading, error, fetch }
}
