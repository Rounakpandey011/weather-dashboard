import axios from 'axios'

const BASE = 'https://api.open-meteo.com/v1'
const AIR_BASE = 'https://air-quality-api.open-meteo.com/v1'
const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1'

// Shared axios instance with sensible timeouts
const api = axios.create({ timeout: 10000 })

/**
 * Reverse-geocode coordinates to a readable city name.
 * Falls back to "Your Location" gracefully.
 */
export async function reverseGeocode(lat, lon) {
  try {
    const { data } = await api.get('https://nominatim.openstreetmap.org/reverse', {
      params: { lat, lon, format: 'json' },
      headers: { 'Accept-Language': 'en' },
    })
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      'Your Location'
    )
  } catch {
    return 'Your Location'
  }
}

/**
 * Fetch current conditions + 7-day hourly forecast.
 * Returns raw open-meteo response.
 */
export async function fetchCurrentWeather(lat, lon) {
  const { data } = await api.get(`${BASE}/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation',
        'weather_code',
        'wind_speed_10m',
        'wind_direction_10m',
        'uv_index',
        'surface_pressure',
      ].join(','),
      hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation_probability',
      'precipitation',
      'visibility', // ✅ ADDED
      'wind_speed_10m',
      'uv_index',
    ].join(','),
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'sunrise',
        'sunset',
        'precipitation_sum',
        'weather_code',
      ].join(','),
      timezone: 'auto',
      forecast_days: 7,
    },
  })
  return data
}

/**
 * Fetch air quality — hourly PM2.5, PM10, European AQI.
 */
export async function fetchAirQuality(lat, lon) {
  const { data } = await api.get(`${AIR_BASE}/air-quality`, {
    params: {
      latitude: lat,
      longitude: lon,
      hourly: ['pm2_5', 'pm10', 'european_aqi'].join(','),
      timezone: 'auto',
      forecast_days: 3,
    },
  })
  return data
}

/**
 * Fetch historical weather for a date range (max 2 years).
 */
export async function fetchHistoricalWeather(lat, lon, startDate, endDate) {
  const { data } = await api.get(`${BASE}/archive`, {
    params: {
      latitude: lat,
      longitude: lon,
      start_date: startDate, // 'YYYY-MM-DD'
      end_date: endDate,
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'temperature_2m_mean',
        'precipitation_sum',
        'wind_speed_10m_max',
      ].join(','),
      timezone: 'auto',
    },
  })
  return data
}

/**
 * Fetch historical air quality (best-effort — may not cover all ranges).
 */
export async function fetchHistoricalAirQuality(lat, lon, startDate, endDate) {
  const { data } = await api.get(`${AIR_BASE}/air-quality`, {
    params: {
      latitude: lat,
      longitude: lon,
      hourly: ['pm2_5', 'pm10'].join(','),
      start_date: startDate,
      end_date: endDate,
      timezone: 'auto',
    },
  })
  return data
}

/**
 * Search for a city by name.
 */
export async function searchCity(query) {
  const { data } = await api.get(`${GEO_BASE}/search`, {
    params: { name: query, count: 5, language: 'en', format: 'json' },
  })
  return data.results || []
}
