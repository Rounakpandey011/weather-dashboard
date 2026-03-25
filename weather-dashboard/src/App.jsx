import { Routes, Route } from 'react-router-dom'
import { useGeolocation } from './hooks/useGeolocation'
import { useWeather } from './hooks/useWeather'

import Navbar from './components/layout/Navbar'
import CurrentWeather from './pages/CurrentWeather'
import HistoricalData from './pages/HistoricalData'

export default function App() {
  const { coords, error: geoError } = useGeolocation()

  const {
    weather,
    airQuality,
    cityName,
    loading,
    error,
    refetch, // assume you expose this (small upgrade)
  } = useWeather(coords)

  return (
    <div className="min-h-screen bg-sky-gradient">
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar cityName={cityName} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        
        {/* Geolocation Warning */}
        {geoError && !geoError.includes('denied') && (
          <Alert type="warning">
            📍 Using default location. {geoError}
          </Alert>
        )}

        {/* API Error */}
        {error && (
          <Alert type="error">
            ⚠️ Unable to fetch latest weather data.
            <button
              onClick={refetch}
              className="ml-3 underline text-sm hover:text-white"
            >
              Retry
            </button>
          </Alert>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <CurrentWeather
                weather={weather}
                airQuality={airQuality}
                cityName={cityName}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/history"
            element={<HistoricalData coords={coords} />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-8 mt-4 border-t border-white/[0.04]">
        <p className="text-slate-600 text-xs font-body text-center">
          Data powered by{' '}
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-frost transition-colors"
          >
            Open-Meteo
          </a>{' '}
          &{' '}
          <a
            href="https://air-quality-api.open-meteo.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-frost transition-colors"
          >
            Air Quality API
          </a>
        </p>
      </footer>
    </div>
  )
}

/* 🔹 Small reusable alert component */
function Alert({ children, type = 'info' }) {
  const styles = {
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    error: 'bg-red-500/10 border-red-500/20 text-red-300',
    info: 'bg-sky-500/10 border-sky-500/20 text-sky-300',
  }

  return (
    <div
      className={`px-4 py-3 rounded-xl border text-sm font-body ${styles[type]}`}
    >
      {children}
    </div>
  )
}