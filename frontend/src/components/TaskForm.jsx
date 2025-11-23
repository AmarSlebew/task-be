import { useState } from 'react'

export default function TaskForm({ onCreate, disabled }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!title.trim()) {
      setError('Judul wajib diisi')
      return
    }
    try {
      await onCreate({ title, description })
      setTitle('')
      setDescription('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">Judul</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tambahkan judul"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">Deskripsi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detail atau catatan"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-500 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-indigo-400 transition disabled:opacity-60"
      >
        {disabled ? 'Menyimpan...' : 'Tambah Task'}
      </button>
      {error && <p className="text-sm text-rose-100 bg-rose-500/20 border border-rose-500/30 p-3 rounded-xl">{error}</p>}
    </form>
  )
}
