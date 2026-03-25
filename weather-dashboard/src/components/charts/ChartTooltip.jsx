// Custom recharts tooltip — improved version

export default function ChartTooltip({
  active,
  payload = [],
  label,
  unit = '',
}) {
  if (!active || !payload.length) return null

  return (
    <div className="bg-sky-900/95 border border-white/10 rounded-xl px-3 py-2 shadow-xl text-xs backdrop-blur-md min-w-[120px]">
      {/* Time label */}
      <p className="text-slate-400 mb-1 text-[11px]">{label || '--'}</p>

      {/* Values */}
      <div className="space-y-1">
        {payload.map((entry) => {
          const value =
            entry?.value !== undefined && entry?.value !== null
              ? entry.value
              : '--'

          return (
            <div
              key={entry.dataKey || entry.name}
              className="flex items-center justify-between gap-2"
            >
              <span
                className="flex items-center gap-1 text-slate-300"
              >
                {/* Color dot */}
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color || '#7dd3fc' }}
                />
                {entry.name}
              </span>

              <span className="font-semibold text-white">
                {value}
                {unit}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}