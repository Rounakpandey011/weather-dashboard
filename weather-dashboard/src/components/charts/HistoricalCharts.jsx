import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatDate } from '../../utils/weatherUtils'
import ChartTooltip from './ChartTooltip'

export function HistoricalTempChart({ dates, maxTemps, minTemps, meanTemps }) {
  const data = dates.map((d, i) => ({
    date: formatDate(d),
    Max: Math.round(maxTemps[i]),
    Min: Math.round(minTemps[i]),
    Mean: Math.round(meanTemps[i]),
  }))

  // Downsample if > 90 days for performance
  const sampled = data.length > 90 ? data.filter((_, i) => i % 3 === 0) : data

  return (
    <div className="card p-5">
      <h3 className="font-display font-semibold text-white text-sm mb-4">Temperature Trend (°C)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={sampled} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="maxGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb923c" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="minGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip unit="°C" />} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b', paddingTop: '8px' }} />
          <Area type="monotone" dataKey="Max" stroke="#fb923c" strokeWidth={1.5} fill="url(#maxGrad)" dot={false} />
          <Area type="monotone" dataKey="Mean" stroke="#7dd3fc" strokeWidth={2} fill="none" dot={false} />
          <Area type="monotone" dataKey="Min" stroke="#818cf8" strokeWidth={1.5} fill="url(#minGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function HistoricalPrecipChart({ dates, precipitation }) {
  const data = dates.map((d, i) => ({
    date: formatDate(d),
    mm: Math.round(precipitation[i] * 10) / 10,
  }))

  const sampled = data.length > 90 ? data.filter((_, i) => i % 3 === 0) : data

  return (
    <div className="card p-5">
      <h3 className="font-display font-semibold text-white text-sm mb-4">Precipitation (mm/day)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sampled} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip unit=" mm" />} />
          <Bar dataKey="mm" name="Precip" fill="#818cf8" radius={[2, 2, 0, 0]} opacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function HistoricalAirChart({ times, pm25, pm10 }) {
  // Hourly data — downsample to every 6h
  const data = times
    .filter((_, i) => i % 6 === 0)
    .map((t, i) => ({
      date: formatDate(t),
      'PM2.5': pm25[i * 6] != null ? Math.round(pm25[i * 6]) : null,
      PM10: pm10[i * 6] != null ? Math.round(pm10[i * 6]) : null,
    }))

  return (
    <div className="card p-5">
      <h3 className="font-display font-semibold text-white text-sm mb-4">Air Quality — PM2.5 & PM10 (μg/m³)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip unit=" μg/m³" />} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b', paddingTop: '8px' }} />
          <Line type="monotone" dataKey="PM2.5" stroke="#fb923c" strokeWidth={1.5} dot={false} connectNulls />
          <Line type="monotone" dataKey="PM10" stroke="#f472b6" strokeWidth={1.5} dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
