import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import TextInput from '../components/common/TextInput'
import { register as registerApi } from '../services/authService'

export default function RegisterPage({ isAuthenticated }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (!form.name || !form.email || !form.password) {
      setMessage('Semua field wajib diisi.')
      return
    }
    const user = await registerApi(form)
    setMessage(`Akun untuk ${user.email} berhasil dibuat. Silakan login.`)
  }

  return (
    <div className="relative isolate min-h-screen bg-canvas text-mist">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-success/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-primary/20 backdrop-blur-2xl">
          <div className="mb-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-mist/50">SmarTask</p>
            <h1 className="text-3xl font-semibold text-white">Daftar Akun Baru</h1>
            <p className="text-sm text-mist/70">Buat akun untuk mengakses dashboard dan mulai mengatur tugas.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              label="Nama"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama lengkap"
              required
            />
            <TextInput
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            {message && <p className="text-sm text-success/80">{message}</p>}
            <Button type="submit" className="w-full py-3 shadow-lg shadow-primary/30">
              Daftar
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-mist/80">
            <p className="text-xs text-mist/60">Sudah punya akun?</p>
            <Link to="/login" className="font-semibold text-primary hover:text-white">
              Kembali ke halaman login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
