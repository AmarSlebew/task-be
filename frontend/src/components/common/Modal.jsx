export default function Modal({ open, title, onClose, children, actions }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 backdrop-blur-sm bg-black/60">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-surface/90 shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/5">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-mist/70 transition hover:bg-white/10 hover:text-white"
          >
            Tutup
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4">{children}</div>
        {actions && <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-white/5 px-6 py-4">{actions}</div>}
      </div>
    </div>
  )
}
