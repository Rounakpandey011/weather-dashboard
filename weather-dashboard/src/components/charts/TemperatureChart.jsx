import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useState, useMemo } from 'react'
import { formatHour, celsiusToFahrenheit } from '../../utils/weatherUtils'
import ChartTooltip from './ChartTooltip'

export default function TemperatureChart({
  hourlyTimes = [],
  temperatures = [],
  sliceFrom = 0,
  sliceTo = 24,
}) {
  const [unit, setUnit] = useState('C')

  // Unique gradient ID (prevents collision)
  const gradientId = useMemo(
    () => `tempGrad-${Math.random().toString(36).substring(2, 8)}`,
    []
  )

  // Memoized data (performance boost)
  const data = useMemo(() => {
    if (!hourlyTimes.length || !temperatures.length) return []

    return hourlyTimes.slice(sliceFrom, sliceTo).map((t, i) => {
      const raw = temperatures[sliceFrom + i] ?? 0

      const tempValue =
        unit === 'C'
          ? Math.round(raw)
          : Math.round(celsiusToFahrenheit(raw))

      return {
        time: formatHour(t),
        temp: tempValue,
      }
    })
  }, [hourlyTimes, temperatures, sliceFrom, sliceTo, unit])

  return (
    <div className="card p-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-white text-sm">
          Temperature
        </h3>

        {/* Unit Toggle */}
        <div className="flex rounded-lg overflow-hidden border border-white/10 text-xs font-mono">
          {['C', 'F'].map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-3 py-1 transition-all duration-200 ${
                unit === u
                  ? 'bg-frost/20 text-frost'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              °{u}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />

          <XAxis
            dataKey="time"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={['dataMin - 2', 'dataMax + 2']}
          />

          <Tooltip content={<ChartTooltip unit={`°${unit}`} />} />

          <Area
            type="monotone"
            dataKey="temp"
            name="Temperature"
            stroke="#7dd3fc"
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

