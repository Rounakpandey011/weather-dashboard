import { useMemo, useState } from 'react'

import HeroCard from '../components/ui/HeroCard'
import StatCard from '../components/ui/StatCard'
import AirQualityCard from '../components/ui/AirQualityCard'
import WeekForecast from '../components/ui/WeekForecast'

import TemperatureChart from '../components/charts/TemperatureChart'
import HumidityChart from '../components/charts/HumidityChart'
import PrecipitationChart from '../components/charts/PrecipitationChart'
import WindChart from '../components/charts/WindChart'
import AirQualityChart from '../components/charts/AirQualityChart'
import VisibilityChart from '../components/charts/VisibilityChart'

import {
  HeroSkeleton,
  StatCardSkeleton,
  ChartSkeleton,
} from '../components/ui/Skeleton'

import ErrorMessage from '../components/ui/ErrorMessage'
import { getTodayHourlySlice, degreesToCompass } from '../utils/weatherUtils'

export default function CurrentWeather({
  weather,
  airQuality,
  cityName,
  loading,
  error,
}) {
  const [unit, setUnit] = useState('C')

  // ALWAYS define data safely before any return
  const current = weather?.current || {}
  const hourly = weather?.hourly || {}
  const daily = weather?.daily || {}
  const aq = airQuality?.hourly || null

  // ✅ FIXED: Hook always runs
  const { from, to } = useMemo(() => {
    return getTodayHourlySlice(hourly?.time || [])
  }, [hourly])

  // Error state
  if (error) return <ErrorMessage message={error} />

  // Loading state
  if (loading || !weather) {
    return (
      <div className="space-y-4 animate-fade-in">
        <HeroSkeleton />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        <ChartSkeleton height="h-64" />

        <div className="grid sm:grid-cols-2 gap-4">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <HeroCard
        current={current}
        daily={daily}
        cityName={cityName || 'Your Location'}
      />

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon="💧"
          label="Humidity"
          value={`${current?.relative_humidity_2m ?? '--'}%`}
          sub="Relative humidity"
        />
        <StatCard
          icon="🌧️"
          label="Precipitation"
          value={`${current?.precipitation ?? '--'} mm`}
          sub="Last hour"
        />
        <StatCard
          icon="☀️"
          label="UV Index"
          value={current?.uv_index ?? '--'}
          sub={uvLabel(current?.uv_index)}
          accent={uvColor(current?.uv_index)}
        />
        <StatCard
          icon="🧭"
          label="Wind"
          value={`${Math.round(current?.wind_speed_10m ?? 0)} km/h`}
          sub={degreesToCompass(current?.wind_direction_10m)}
        />
        <StatCard
          icon="🌅"
          label="Sun Cycle"
          value={formatTime(daily?.sunrise?.[0])}
          sub={`Sunset: ${formatTime(daily?.sunset?.[0])}`}
        />
      </section>

      {/* Pressure + AQ */}
      <section className="grid sm:grid-cols-3 gap-4">
        <StatCard
          icon="🔵"
          label="Pressure"
          value={`${Math.round(current?.surface_pressure ?? 0)} hPa`}
          sub="Surface pressure"
        />

        {aq && (
          <div className="sm:col-span-2">
            <AirQualityCard hourly={aq} />
          </div>
        )}
      </section>

      {/* Charts */}
      <section>
        <h2 className="section-title">Hourly Forecast</h2>

        <div className="flex justify-end mb-2">
          <button
            onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
            className="px-3 py-1 text-xs bg-sky-800 text-white rounded-lg hover:bg-sky-700 transition"
          >
            °{unit} → °{unit === 'C' ? 'F' : 'C'}
          </button>
        </div>

        <div className="space-y-4">
          <TemperatureChart
            hourlyTimes={hourly?.time || []}
            temperatures={(hourly?.temperature_2m || []).map(t =>
              convertTemp(t, unit)
            )}
            sliceFrom={from}
            sliceTo={to}
            unit={unit}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <HumidityChart
              hourlyTimes={hourly?.time || []}
              humidity={hourly?.relative_humidity_2m || []}
              sliceFrom={from}
              sliceTo={to}
            />

            <PrecipitationChart
              hourlyTimes={hourly?.time || []}
              precipitation={hourly?.precipitation || []}
              precipProbability={hourly?.precipitation_probability || []}
              sliceFrom={from}
              sliceTo={to}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <WindChart
              hourlyTimes={hourly?.time || []}
              windSpeed={hourly?.wind_speed_10m || []}
              sliceFrom={from}
              sliceTo={to}
            />

            <VisibilityChart
              hourlyTimes={hourly?.time || []}
              visibility={hourly?.visibility || []}
              sliceFrom={from}
              sliceTo={to}
            />

            {aq && (
              <AirQualityChart
                hourlyTimes={aq?.time || []}
                pm25={aq?.pm2_5 || []}
                pm10={aq?.pm10 || []}
              />
            )}
          </div>
        </div>
      </section>

      {/* Weekly */}
      <section>
        <h2 className="section-title">Weekly Overview</h2>
        <WeekForecast daily={daily} />
      </section>
    </div>
  )
}

// Helpers

function convertTemp(temp, unit) {
  if (temp == null) return 0
  return unit === 'C' ? temp : (temp * 9) / 5 + 32
}

function formatTime(time) {
  if (!time) return '--'
  return new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function uvLabel(uv = 0) {
  if (uv <= 2) return 'Low'
  if (uv <= 5) return 'Moderate'
  if (uv <= 7) return 'High'
  if (uv <= 10) return 'Very High'
  return 'Extreme'
}

function uvColor(uv = 0) {
  if (uv <= 2) return '#2dd4bf'
  if (uv <= 5) return '#fbbf24'
  if (uv <= 7) return '#fb923c'
  return '#f87171'
}