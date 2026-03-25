import { getWeatherInfo, formatTemp, formatTime } from '../../utils/weatherUtils'

export default function HeroCard({ current, daily, cityName, unit = 'C' }) {
  const { temperature_2m, weather_code, wind_speed_10m, apparent_temperature } = current
  const { label, icon } = getWeatherInfo(weather_code)

  const todayMax = daily.temperature_2m_max[0]
  const todayMin = daily.temperature_2m_min[0]
  const sunrise = daily.sunrise[0]
  const sunset = daily.sunset[0]

  return (
    <div className="card-highlight p-6 sm:p-8 animate-slide-up">
      {/* City + condition */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <p className="text-slate-400 font-body text-sm tracking-wide mb-1">
            📍 {cityName}
          </p>
          <div className="flex items-end gap-4">
            <span className="font-display font-bold text-white leading-none" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
              {formatTemp(temperature_2m, unit)}
            </span>
            <span className="text-6xl mb-1">{icon}</span>
          </div>
          <p className="text-slate-300 font-body text-lg mt-1">{label}</p>
          <p className="text-slate-500 font-body text-sm mt-1">
            Feels like {formatTemp(apparent_temperature, unit)}
          </p>
        </div>

        {/* Min/Max */}
        <div className="flex flex-col gap-2 text-right">
          <div>
            <span className="text-slate-500 text-xs uppercase tracking-widest">High</span>
            <p className="font-display font-semibold text-aurora-orange text-xl">
              {formatTemp(todayMax, unit)}
            </p>
          </div>
          <div>
            <span className="text-slate-500 text-xs uppercase tracking-widest">Low</span>
            <p className="font-display font-semibold text-frost text-xl">
              {formatTemp(todayMin, unit)}
            </p>
          </div>
        </div>
      </div>

      {/* Sunrise / Sunset / Wind */}
      <div className="flex flex-wrap gap-4 mt-6 pt-5 border-t border-white/[0.06]">
        <Pill icon="🌅" label="Sunrise" value={formatTime(sunrise)} />
        <Pill icon="🌇" label="Sunset" value={formatTime(sunset)} />
        <Pill icon="💨" label="Wind" value={`${Math.round(wind_speed_10m)} km/h`} />
      </div>
    </div>
  )
}

function Pill({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl px-3 py-2">
      <span className="text-base">{icon}</span>
      <div>
        <p className="text-slate-500 text-xs">{label}</p>
        <p className="text-white text-sm font-body font-medium">{value}</p>
      </div>
    </div>
  )
}
