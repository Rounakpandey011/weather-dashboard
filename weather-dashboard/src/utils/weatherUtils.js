import { format, parseISO } from 'date-fns'

// ─── Unit Conversions ────────────────────────────────────────────────────────

export const celsiusToFahrenheit = (c) => Math.round((c * 9) / 5 + 32)
export const formatTemp = (value, unit) =>
  unit === 'F' ? `${celsiusToFahrenheit(value)}°F` : `${Math.round(value)}°C`

export const kmhToMph = (v) => (v * 0.621371).toFixed(1)

// ─── WMO Weather Code → Description + Icon ──────────────────────────────────

const WMO_CODES = {
  0: { label: 'Clear Sky', icon: '☀️' },
  1: { label: 'Mainly Clear', icon: '🌤️' },
  2: { label: 'Partly Cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Icy Fog', icon: '🌫️' },
  51: { label: 'Light Drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Heavy Drizzle', icon: '🌧️' },
  61: { label: 'Light Rain', icon: '🌧️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy Rain', icon: '🌧️' },
  71: { label: 'Light Snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '❄️' },
  75: { label: 'Heavy Snow', icon: '❄️' },
  77: { label: 'Snow Grains', icon: '🌨️' },
  80: { label: 'Light Showers', icon: '🌦️' },
  81: { label: 'Showers', icon: '🌧️' },
  82: { label: 'Heavy Showers', icon: '⛈️' },
  85: { label: 'Snow Showers', icon: '🌨️' },
  86: { label: 'Heavy Snow Showers', icon: '❄️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm w/ Hail', icon: '⛈️' },
  99: { label: 'Thunderstorm w/ Heavy Hail', icon: '⛈️' },
}

export const getWeatherInfo = (code) =>
  WMO_CODES[code] || { label: 'Unknown', icon: '🌡️' }

// ─── AQI Classification ──────────────────────────────────────────────────────

export function getAqiLevel(aqi) {
  if (aqi <= 20) return { label: 'Good', color: '#2dd4bf' }
  if (aqi <= 40) return { label: 'Fair', color: '#86efac' }
  if (aqi <= 60) return { label: 'Moderate', color: '#fbbf24' }
  if (aqi <= 80) return { label: 'Poor', color: '#fb923c' }
  if (aqi <= 100) return { label: 'Very Poor', color: '#f87171' }
  return { label: 'Extremely Poor', color: '#c026d3' }
}

export function getPm25Level(value) {
  if (value <= 12) return { label: 'Good', color: '#2dd4bf' }
  if (value <= 35) return { label: 'Moderate', color: '#fbbf24' }
  if (value <= 55) return { label: 'Unhealthy (Sensitive)', color: '#fb923c' }
  if (value <= 150) return { label: 'Unhealthy', color: '#f87171' }
  return { label: 'Hazardous', color: '#c026d3' }
}

// ─── Date / Time Helpers ─────────────────────────────────────────────────────

export const formatTime = (isoString) => {
  try { return format(parseISO(isoString), 'h:mm a') }
  catch { return '--' }
}

export const formatDate = (isoString) => {
  try { return format(parseISO(isoString), 'MMM d') }
  catch { return '--' }
}

export const formatHour = (isoString) => {
  try { return format(parseISO(isoString), 'ha').toLowerCase() }
  catch { return '--' }
}

/**
 * Extract today's hourly data (next 24 hours from current time)
 * from an open-meteo hourly response.
 */
export function getTodayHourlySlice(hourlyTimes, now = new Date()) {
  const start = hourlyTimes.findIndex((t) => new Date(t) >= now)
  // Show last 2 hours + next 22 for context (24 total)
  const from = Math.max(0, start - 2)
  return { from, to: from + 24 }
}

// ─── Wind Direction ──────────────────────────────────────────────────────────

export function degreesToCompass(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

// ─── Number Formatting ───────────────────────────────────────────────────────

export const round1 = (v) => Math.round(v * 10) / 10
