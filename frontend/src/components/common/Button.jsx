export default function Button({ children, className = '', type = 'button', ...rest }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:-translate-y-[1px] hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary/60 bg-gradient-to-r from-primary/90 via-primary to-accent/80 shadow-card ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
