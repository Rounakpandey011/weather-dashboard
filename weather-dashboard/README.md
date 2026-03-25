# 🌤️ Atmos — Weather Dashboard

A production-quality weather dashboard built with React + Vite, Tailwind CSS, and Recharts.
Uses the **Open-Meteo API** (100% free, no API key required).

---

## Features

| Feature | Details |
|---|---|
| Auto-location | Browser Geolocation API, falls back to New Delhi |
| Current weather | Temperature, feels-like, humidity, wind, UV, pressure |
| Air quality | PM2.5, PM10, European AQI with color-coded levels |
| Hourly charts | Temperature (°C/°F toggle), humidity, precipitation, wind, AQ |
| 7-day forecast | Min/max per day with condition icons |
| Historical data | Date range picker (up to 2 years), temperature trends, precipitation, air quality |
| Responsive | Mobile-first, works on all screen sizes |
| Performance | Parallel API calls, lazy historical fetch, shimmer skeletons |

---

## Tech Stack

- **React 18** + **Vite** — fast HMR dev server
- **Tailwind CSS** — utility-first styling with custom design tokens
- **Recharts** — composable charts
- **Axios** — HTTP client with timeout handling
- **React Router DOM v6** — client-side routing
- **date-fns** — lightweight date utilities

---

## Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── AirQualityChart.jsx      # Combined PM2.5 + PM10 line chart
│   │   ├── ChartTooltip.jsx         # Shared dark tooltip
│   │   ├── HistoricalCharts.jsx     # Temp/precip/AQ historical charts
│   │   ├── HumidityChart.jsx
│   │   ├── PrecipitationChart.jsx   # Bars + probability line
│   │   ├── TemperatureChart.jsx     # With °C/°F toggle
│   │   └── WindChart.jsx
│   ├── layout/
│   │   └── Navbar.jsx               # Sticky nav with active route highlight
│   └── ui/
│       ├── AirQualityCard.jsx       # AQI gauge + PM metrics
│       ├── ErrorMessage.jsx
│       ├── HeroCard.jsx             # Big current conditions card
│       ├── Skeleton.jsx             # Loading skeleton shapes
│       ├── StatCard.jsx             # Small metric card
│       └── WeekForecast.jsx         # 7-day strip
├── hooks/
│   ├── useGeolocation.js            # Browser geolocation
│   ├── useHistorical.js             # Lazy historical fetch
│   └── useWeather.js                # Current + AQ parallel fetch
├── pages/
│   ├── CurrentWeather.jsx           # Page 1
│   └── HistoricalData.jsx           # Page 2
├── services/
│   └── weatherService.js            # All API calls (Open-Meteo)
├── utils/
│   └── weatherUtils.js              # Formatters, WMO codes, converters
├── App.jsx
├── main.jsx
└── index.css
```

---

## Setup

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# 1. Clone / unzip the project
cd weather-dashboard

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173
```

### Build for Production

```bash
npm run build       # outputs to /dist
npm run preview     # preview the production build locally
```

---

## Deployment — Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel          # follow prompts — framework auto-detected as Vite
```

### Option B: Vercel Dashboard

1. Push repo to GitHub / GitLab
2. Go to [vercel.com/new](https://vercel.com/new) → Import repository
3. Framework: **Vite** (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**

No environment variables needed — Open-Meteo is a public API.

---

## API Reference

All data comes from [Open-Meteo](https://open-meteo.com) — free, no registration:

| Endpoint | Used for |
|---|---|
| `api.open-meteo.com/v1/forecast` | Current + 7-day hourly/daily |
| `air-quality-api.open-meteo.com/v1/air-quality` | PM2.5, PM10, AQI |
| `api.open-meteo.com/v1/archive` | Historical weather |
| `nominatim.openstreetmap.org/reverse` | Reverse geocoding |

---

## Performance Notes

- Parallel `Promise.all` for weather + AQ + geocoding (saves ~600ms)
- Historical data is **lazily fetched** — only on user request
- Charts downsample to every 3rd point when > 90 days of data
- Shimmer skeletons shown immediately, no layout shift
- Fonts loaded via Google Fonts with `display=swap`

---

## License

MIT
