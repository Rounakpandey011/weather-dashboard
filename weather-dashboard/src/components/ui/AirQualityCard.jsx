import { getAqiLevel, getPm25Level } from '../../utils/weatherUtils'

export default function AirQualityCard({ hourly }) {
  // Use the most recent non-null value
  const getLatest = (arr) => {
    if (!arr) return null
    for (let i = 0; i < Math.min(arr.length, 24); i++) {
      if (arr[i] != null) return arr[i]
    }
    return null
  }

  const aqi = getLatest(hourly.european_aqi)
  const pm25 = getLatest(hourly.pm2_5)
  const pm10 = getLatest(hourly.pm10)

  const aqiInfo = aqi != null ? getAqiLevel(aqi) : null
  const pm25Info = pm25 != null ? getPm25Level(pm25) : null

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="font-display font-semibold text-white text-sm mb-4">Air Quality</h3>

      {aqiInfo && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-400 text-xs uppercase tracking-widest">European AQI</span>
            <span className="text-xs font-mono" style={{ color: aqiInfo.color }}>{aqiInfo.label}</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min((aqi / 100) * 100, 100)}%`, background: aqiInfo.color }}
            />
          </div>
          <p className="text-white font-mono font-semibold text-2xl mt-2">{Math.round(aqi)}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mt-3">
        <Metric
          label="PM2.5"
          value={pm25 != null ? `${Math.round(pm25 * 10) / 10} μg/m³` : '--'}
          color={pm25Info?.color}
          sub={pm25Info?.label}
        />
        <Metric
          label="PM10"
          value={pm10 != null ? `${Math.round(pm10 * 10) / 10} μg/m³` : '--'}
          color="#f472b6"
        />
      </div>
    </div>
  )
}

function Metric({ label, value, color, sub }) {
  return (
    <div className="bg-white/[0.03] rounded-xl p-3">
      <p className="text-slate-500 text-xs mb-1">{label}</p>
      <p className="font-mono font-semibold text-sm" style={color ? { color } : { color: '#e2e8f0' }}>
        {value}
      </p>
      {sub && <p className="text-xs text-slate-600 mt-0.5">{sub}</p>}
    </div>
  )
}
