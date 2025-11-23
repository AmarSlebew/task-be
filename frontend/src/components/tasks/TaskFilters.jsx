const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

export default function TaskFilters({ value, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1 text-sm backdrop-blur-xl shadow-card">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onChange(filter.key)}
          className={`rounded-full px-4 py-2 font-medium transition ${
            value === filter.key
              ? 'bg-white/10 text-white border border-primary/40 shadow-glow'
              : 'text-mist/70 hover:text-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
