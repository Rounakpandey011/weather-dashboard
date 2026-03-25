import { NavLink } from 'react-router-dom'

export default function Navbar({ cityName }) {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
      isActive
        ? 'bg-frost/15 text-frost border border-frost/25'
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-sky-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🌤️</span>
          <span className="font-display font-bold text-white text-lg tracking-tight">Atmos</span>
          {cityName && (
            <span className="hidden sm:inline text-slate-500 text-sm ml-2">— {cityName}</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Now
          </NavLink>
          <NavLink to="/history" className={linkClass}>
            History
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
