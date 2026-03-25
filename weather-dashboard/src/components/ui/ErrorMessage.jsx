export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card p-8 text-center space-y-4 animate-fade-in">
      <div className="text-5xl">⚠️</div>
      <p className="text-slate-300 font-body">{message || 'Something went wrong'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-frost/10 text-frost border border-frost/20 text-sm hover:bg-frost/20 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
