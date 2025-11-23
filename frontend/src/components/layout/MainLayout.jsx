import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navItems = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Profile', to: '/profile' },
]

export default function MainLayout({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('smartask_theme') || 'dark')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('theme-light', theme === 'light')
    localStorage.setItem('smartask_theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition hover:bg-white/5 hover:text-white border border-transparent ${
      isActive ? 'bg-white/5 text-white border-white/10 shadow-glow' : 'text-mist/80'
    }`

  return (
    <div className="min-h-screen bg-canvas text-mist">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-10 right-10 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-success/12 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen">
        <aside className="hidden lg:flex w-72 flex-col gap-6 border-r border-white/10 bg-white/5 backdrop-blur-2xl p-6">
          <Link to="/dashboard" className="flex items-center gap-3 text-lg font-semibold text-white">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 text-primary shadow-glow">
              TM
            </span>
            <div>
              <p className="text-sm text-mist/60">Task Manager</p>
              <p className="leading-tight">SmarTask</p>
            </div>
          </Link>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end>
                {item.name}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-mist transition hover:bg-white/10 border border-white/10"
            >
              <span>Tema</span>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{theme === 'dark' ? 'Gelap' : 'Terang'}</span>
            </button>
            <button
              onClick={onLogout}
              className="mt-2 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-danger transition hover:bg-danger/10 border border-danger/30"
            >
              Logout
            </button>
          </nav>

          <div className="mt-auto rounded-2xl bg-white/5 border border-white/10 p-4 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-mist/60">Signed in</p>
            <p className="mt-2 text-sm text-mist/80">{user?.email}</p>
            <p className="text-lg font-semibold text-white">{user?.name}</p>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between border-b border-white/10 bg-surface/70 px-4 py-4 backdrop-blur-xl lg:hidden">
            <Link to="/dashboard" className="flex items-center gap-2 text-white font-semibold">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary">TM</span>
              SmarTask
            </Link>
            <button
              className="rounded-xl border border-white/10 bg-overlay p-2 text-mist hover:text-white"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </header>

          {mobileOpen && (
            <div className="border-b border-white/10 bg-surface/80 px-4 py-3 lg:hidden">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={navLinkClass}
                    onClick={() => setMobileOpen(false)}
                    end
                  >
                    {item.name}
                  </NavLink>
                ))}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-mist transition hover:bg-white/10"
                >
                  {theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
                </button>
                <button
                  onClick={() => {
                    onLogout()
                    setMobileOpen(false)
                  }}
                  className="mt-2 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-danger transition hover:bg-danger/10 border border-transparent"
                >
                  Logout
                </button>
              </nav>
            </div>
          )}

          <main className="flex-1 px-4 py-8 lg:px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
