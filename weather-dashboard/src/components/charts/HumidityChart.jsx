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

export default function HumidityChart({ hourlyTimes, humidity, sliceFrom, sliceTo }) {
  const data = hourlyTimes.slice(sliceFrom, sliceTo).map((t, i) => ({
    time: formatHour(t),
    humidity: humidity[sliceFrom + i],
  }))

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="font-display font-semibold text-white text-sm mb-4">Humidity</h3>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip unit="%" />} />
          <Area
            type="monotone"
            dataKey="humidity"
            name="Humidity"
            stroke="#2dd4bf"
            strokeWidth={2}
            fill="url(#humidGrad)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
