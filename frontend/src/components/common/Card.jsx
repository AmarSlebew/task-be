export default function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 shadow-card backdrop-blur-2xl transition hover:border-primary/20 hover:shadow-glow ${className}`}
    >
      {children}
    </div>
  )
}
