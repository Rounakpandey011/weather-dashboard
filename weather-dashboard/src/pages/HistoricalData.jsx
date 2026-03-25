import { useState } from 'react'
import { format, subDays, subYears, isAfter, isBefore, parseISO } from 'date-fns'
import { useHistorical } from '../hooks/useHistorical'
import {
  HistoricalTempChart,
  HistoricalPrecipChart,
  HistoricalAirChart,
} from '../components/charts/HistoricalCharts'
import { ChartSkeleton } from '../components/ui/Skeleton'
import ErrorMessage from '../components/ui/ErrorMessage'

const TODAY = format(new Date(), 'yyyy-MM-dd')
const MIN_DATE = format(subYears(new Date(), 2), 'yyyy-MM-dd')
const DEFAULT_START = format(subDays(new Date(), 30), 'yyyy-MM-dd')

export default function HistoricalData({ coords }) {
  const [startDate, setStartDate] = useState(DEFAULT_START)
  const [endDate, setEndDate] = useState(TODAY)
  const [dateError, setDateError] = useState('')
  const [unit, setUnit] = useState('C')

  const { weather, airQuality, loading, error, fetch } = useHistorical(coords)

  function validate(start, end) {
    if (isAfter(parseISO(start), parseISO(end))) {
      return 'Start date must be before end date'
    }
    if (isBefore(parseISO(start), parseISO(MIN_DATE))) {
      return 'Maximum range is 2 years back'
    }
    if (isAfter(parseISO(end), new Date())) {
      return 'End date cannot be in the future'
    }
    return ''
  }

  function handleFetch() {
    const err = validate(startDate, endDate)
    if (err) {
      setDateError(err)
      return
    }
    setDateError('')
    fetch(startDate, endDate)
  }

  const hasPrecipData = weather?.daily?.precipitation_sum?.some((v) => v != null)
  const hasAirData = airQuality?.hourly?.pm2_5?.some((v) => v != null)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-white text-2xl">
          Historical Weather
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Explore weather patterns up to 2 years back
        </p>
      </div>

      {/* Date Picker */}
      <div className="card p-5">
        <div className="flex flex-wrap items-end gap-4">
          <DateField
            label="Start Date"
            value={startDate}
            min={MIN_DATE}
            max={endDate}
            onChange={setStartDate}
          />
          <DateField
            label="End Date"
            value={endDate}
            min={startDate}
            max={TODAY}
            onChange={setEndDate}
          />

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setStartDate(p.start)
                  setEndDate(TODAY)
                  setDateError('')
                }}
                className="px-3 py-2 rounded-lg text-xs text-slate-400 bg-white/[0.04] border border-white/[0.06] hover:text-frost hover:border-frost/30 transition"
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleFetch}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-frost/15 text-frost border border-frost/25 text-sm hover:bg-frost/25 transition disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Fetch Data'}
          </button>
        </div>

        {dateError && <p className="text-red-400 text-xs mt-3">{dateError}</p>}
      </div>

      {/* Results */}
      {error && <ErrorMessage message={error} />}

      {loading && (
        <div className="space-y-4">
          <ChartSkeleton height="h-64" />
          <div className="grid sm:grid-cols-2 gap-4">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        </div>
      )}

      {!loading && weather && (
        <div className="space-y-4 animate-fade-in">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">
              Showing: {startDate} → {endDate}
            </p>

            <button
              onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
              className="px-3 py-1 text-xs bg-sky-800 text-white rounded-lg hover:bg-sky-700 transition"
            >
              °{unit} → °{unit === 'C' ? 'F' : 'C'}
            </button>
          </div>

          {/* Charts */}
          <div className="overflow-x-auto space-y-4">
            <HistoricalTempChart
              dates={weather.daily.time}
              maxTemps={weather.daily.temperature_2m_max.map((t) => convertTemp(t, unit))}
              minTemps={weather.daily.temperature_2m_min.map((t) => convertTemp(t, unit))}
              meanTemps={weather.daily.temperature_2m_mean.map((t) => convertTemp(t, unit))}
              unit={unit}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              {hasPrecipData && (
                <HistoricalPrecipChart
                  dates={weather.daily.time}
                  precipitation={weather.daily.precipitation_sum}
                />
              )}

              {hasAirData && (
                <HistoricalAirChart
                  times={airQuality.hourly.time}
                  pm25={airQuality.hourly.pm2_5}
                  pm10={airQuality.hourly.pm10}
                />
              )}
            </div>
          </div>

          {/* Summary */}
          <SummaryStats daily={weather.daily} unit={unit} />
        </div>
      )}

      {!loading && !weather && !error && (
        <div className="card p-12 text-center text-slate-500">
          <p className="text-4xl mb-3">📅</p>
          <p>
            Select a date range and click{' '}
            <strong className="text-slate-400">Fetch Data</strong>
          </p>
          <p className="text-xs mt-2 text-slate-600">
            Tip: Try "Last 30d" for best visualization
          </p>
        </div>
      )}
    </div>
  )
}

// Helpers

function convertTemp(temp, unit) {
  if (temp == null) return 0
  return unit === 'C' ? temp : (temp * 9) / 5 + 32
}

// Sub-components

function DateField({ label, value, min, max, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-slate-500 text-xs uppercase">{label}</label>
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
      />
    </div>
  )
}

function SummaryStats({ daily, unit }) {
  const safe = (arr) => arr?.filter((v) => v != null) || []

  const maxTemps = safe(daily.temperature_2m_max)
  const minTemps = safe(daily.temperature_2m_min)
  const precip = safe(daily.precipitation_sum)

  const avg = (arr) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0

  const convert = (t) =>
    unit === 'C' ? t : (t * 9) / 5 + 32

  const stats = [
    {
      label: 'Hottest Day',
      value: maxTemps.length ? `${Math.round(convert(Math.max(...maxTemps)))}°${unit}` : '--',
    },
    {
      label: 'Coldest Day',
      value: minTemps.length ? `${Math.round(convert(Math.min(...minTemps)))}°${unit}` : '--',
    },
    {
      label: 'Avg High',
      value: maxTemps.length ? `${Math.round(convert(avg(maxTemps)))}°${unit}` : '--',
    },
    {
      label: 'Total Rain',
      value: precip.length ? `${Math.round(precip.reduce((a, b) => a + b, 0))} mm` : '--',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="card p-4 text-center">
          <p className="text-slate-500 text-xs">{s.label}</p>
          <p className="text-white text-xl font-bold mt-1">{s.value}</p>
        </div>
      ))}
    </div>
  )
}

// Presets

const PRESETS = [
  { label: 'Last 7d', start: format(subDays(new Date(), 7), 'yyyy-MM-dd') },
  { label: 'Last 30d', start: format(subDays(new Date(), 30), 'yyyy-MM-dd') },
  { label: 'Last 90d', start: format(subDays(new Date(), 90), 'yyyy-MM-dd') },
  { label: 'Last 6mo', start: format(subDays(new Date(), 180), 'yyyy-MM-dd') },
  { label: 'Last year', start: format(subYears(new Date(), 1), 'yyyy-MM-dd') },
]