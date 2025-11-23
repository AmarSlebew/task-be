import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import TextInput from '../components/common/TextInput'

export default function LoginPage({ onLogin, isAuthenticated }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

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
    setError('')
    if (!form.email || !form.password) {
      setError('Email dan password wajib diisi.')
      return
    }
    try {
      await onLogin(form)
      const redirectTo = location.state?.from?.pathname || '/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Login gagal')
    }
  }

  return (
    <div className="relative isolate min-h-screen bg-canvas text-mist">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-primary/20 backdrop-blur-2xl">
          <div className="mb-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-mist/50">SmarTask</p>
            <h1 className="text-3xl font-semibold text-white">Masuk Akun Anda</h1>
            <p className="text-sm text-mist/70">Kelola tugas harian, cuaca, dan inspirasi dengan tampilan nyaman.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              label="Alamat Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="test@example.com"
              required
            />
            <TextInput
              label="Kata Sandi"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            {error && <p className="text-sm text-amber/80">{error}</p>}
            <Button type="submit" className="w-full py-3 shadow-lg shadow-primary/30">
              Masuk ke Dashboard
            </Button>
          </form>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-mist/80">
            <div className="flex items-center justify-between text-xs text-mist/60">
              <span>Belum memiliki akun?</span>
              <Link to="/register" className="font-semibold text-primary hover:text-white">
                Daftar Akun Baru Sekarang
              </Link>
            </div>
            <div className="rounded-xl border border-white/10 bg-surface/60 p-3 text-xs text-mist/60">
              Demo: test@example.com / 123456
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
