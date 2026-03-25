import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts'
import { formatHour } from '../../utils/weatherUtils'
import ChartTooltip from './ChartTooltip'

export default function PrecipitationChart({ hourlyTimes, precipitation, precipProbability, sliceFrom, sliceTo }) {
  const data = hourlyTimes.slice(sliceFrom, sliceTo).map((t, i) => ({
    time: formatHour(t),
    mm: precipitation[sliceFrom + i],
    prob: precipProbability[sliceFrom + i],
  }))

  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-white text-sm">Precipitation</h3>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#818cf8] inline-block" /> mm</span>
          <span className="flex items-center gap-1"><span className="w-3 h-1 bg-[#fb923c] inline-block" /> prob %</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <ComposedChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="mm" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="prob" orientation="right" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} />
          <Bar yAxisId="mm" dataKey="mm" name="Rain (mm)" fill="#818cf8" radius={[3, 3, 0, 0]} opacity={0.8} />
          <Line yAxisId="prob" type="monotone" dataKey="prob" name="Probability (%)" stroke="#fb923c" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
