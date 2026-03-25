import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import ChartTooltip from './ChartTooltip'

export default function VisibilityChart({
  hourlyTimes = [],
  visibility = [],
  sliceFrom = 0,
  sliceTo = 24,
}) {
  const data = hourlyTimes.slice(sliceFrom, sliceTo).map((time, i) => ({
    time: new Date(time).getHours() + ':00',
    visibility: visibility[sliceFrom + i],
  }))

  return (
    <div className="card">
      <h3 className="card-title">Visibility</h3>

      <div className="h-64 w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip content={<ChartTooltip unit=" km" />} />

            <Line
              type="monotone"
              dataKey="visibility"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}