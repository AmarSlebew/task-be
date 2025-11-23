export default function TextInput({ label, type = 'text', name, value, onChange, placeholder, required = false }) {
  return (
    <label className="block text-sm text-mist/80">
      <span className="mb-2 block text-xs font-semibold tracking-[0.18em] text-mist/50">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist placeholder:text-mist/50 shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </label>
  )
}
