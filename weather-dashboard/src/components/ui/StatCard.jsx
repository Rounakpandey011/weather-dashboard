// A small metric card with icon, label, value, and optional sub-value.

export default function StatCard({ icon, label, value, sub, accent, className = '' }) {
  return (
    <div className={`card p-4 flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-2 text-slate-400 text-xs font-body uppercase tracking-widest">
        <span className="text-base">{icon}</span>
        <span>{label}</span>
      </div>
      <div
        className="font-display font-semibold text-xl text-white mt-1"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
    </div>
  )
}
