import { useState } from 'react'

export default function AuthPanel({ onSubmit, busy, baseUrl }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await onSubmit(mode, form)
      setMessage(mode === 'login' ? 'Login berhasil!' : 'Registrasi berhasil, Anda sudah login.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  const tabs = [
    { key: 'login', label: 'Login' },
    { key: 'register', label: 'Register' },
  ]

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 shadow-xl shadow-indigo-900/30 text-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Autentikasi</h2>
          <p className="text-sm text-slate-200/80">Terhubung ke API: {baseUrl}</p>
        </div>
        <div className="flex gap-2 bg-white/5 border border-white/10 rounded-full p-1">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setMode(item.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition shadow-sm ${
                mode === item.key
                  ? 'bg-white text-slate-900 shadow-lg shadow-indigo-500/30'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nama lengkap"
            />
          </div>
        )}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-100">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="email@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-100">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="******"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:from-indigo-400 hover:to-sky-400 transition disabled:opacity-60"
        >
          {busy ? 'Memproses...' : mode === 'login' ? 'Login' : 'Register & Login'}
        </button>
        {message && <p className="text-sm text-indigo-100 bg-indigo-500/20 border border-indigo-500/30 rounded-xl p-3">{message}</p>}
      </form>
    </div>
  )
}
