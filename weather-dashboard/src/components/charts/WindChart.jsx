import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatHour } from '../../utils/weatherUtils'
import ChartTooltip from './ChartTooltip'

export default function WindChart({ hourlyTimes, windSpeed, sliceFrom, sliceTo }) {
  const data = hourlyTimes.slice(sliceFrom, sliceTo).map((t, i) => ({
    time: formatHour(t),
    wind: Math.round(windSpeed[sliceFrom + i]),
  }))

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="font-display font-semibold text-white text-sm mb-4">Wind Speed</h3>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip unit=" km/h" />} />
          <Area
            type="monotone"
            dataKey="wind"
            name="Wind"
            stroke="#a78bfa"
            strokeWidth={2}
            fill="url(#windGrad)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
