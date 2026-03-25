import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatHour } from '../../utils/weatherUtils'
import ChartTooltip from './ChartTooltip'

export default function AirQualityChart({ hourlyTimes, pm25, pm10 }) {
  // Show first 24 hours
  const data = hourlyTimes.slice(0, 24).map((t, i) => ({
    time: formatHour(t),
    'PM2.5': pm25[i] != null ? Math.round(pm25[i] * 10) / 10 : null,
    PM10: pm10[i] != null ? Math.round(pm10[i] * 10) / 10 : null,
  }))

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="font-display font-semibold text-white text-sm mb-4">Air Quality — PM2.5 & PM10</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip unit=" μg/m³" />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', color: '#64748b', paddingTop: '8px' }}
          />
          <Line type="monotone" dataKey="PM2.5" stroke="#fb923c" strokeWidth={2} dot={false} connectNulls />
          <Line type="monotone" dataKey="PM10" stroke="#f472b6" strokeWidth={2} dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
