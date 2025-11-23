import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import { fetchProfile, login as loginApi, logout as logoutApi } from './services/authService'

function ProtectedRoute({ user, children }) {
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}

export default function App() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const hasSession = useMemo(() => Boolean(token && user), [token, user])

  useEffect(() => {
    const storedToken = localStorage.getItem('smartask_token')
    const storedUser = localStorage.getItem('smartask_user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (token) {
      fetchProfile(token)
        .then((profile) => {
          setUser((prev) => ({ ...(prev || {}), ...profile }))
          localStorage.setItem('smartask_user', JSON.stringify({ ...(user || {}), ...profile }))
        })
        .catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleLogin = async (credentials) => {
    const { token: newToken, user: nextUser } = await loginApi(credentials)
    setToken(newToken)
    setUser(nextUser)
    localStorage.setItem('smartask_token', newToken)
    localStorage.setItem('smartask_user', JSON.stringify(nextUser))
  }

  const handleLogout = async () => {
    await logoutApi()
    setToken('')
    setUser(null)
    localStorage.removeItem('smartask_token')
    localStorage.removeItem('smartask_user')
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} isAuthenticated={hasSession} />} />
      <Route path="/register" element={<RegisterPage isAuthenticated={hasSession} />} />
      <Route
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage token={token} user={user} />} />
        <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
      </Route>
      <Route path="*" element={<Navigate to={hasSession ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}
