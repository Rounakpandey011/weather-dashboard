import { formatDate, getWeatherInfo, formatTemp } from '../../utils/weatherUtils'

export default function WeekForecast({ daily, unit = 'C' }) {
  const days = daily.time.slice(0, 7)

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="font-display font-semibold text-white text-sm mb-4">7-Day Forecast</h3>
      <div className="space-y-2">
        {days.map((date, i) => {
          const { icon } = getWeatherInfo(daily.weather_code[i])
          return (
            <div
              key={date}
              className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
            >
              <span className="text-slate-400 font-body text-sm w-16">
                {i === 0 ? 'Today' : formatDate(date)}
              </span>
              <span className="text-xl">{icon}</span>
              <div className="flex items-center gap-3 text-sm font-mono">
                <span className="text-slate-500">{formatTemp(daily.temperature_2m_min[i], unit)}</span>
                {/* Temperature bar */}
                <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden hidden sm:block">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-frost to-aurora-orange"
                    style={{ width: '60%' }}
                  />
                </div>
                <span className="text-white font-medium">{formatTemp(daily.temperature_2m_max[i], unit)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
