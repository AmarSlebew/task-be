import api from './api'

export async function login({ email, password }) {
  try {
    const { data } = await api.post('/login', { email, password })
    return {
      token: data.token,
      user: data.user || { name: data.name || 'User', email },
    }
  } catch (error) {
    // fallback demo token
    return {
      token: 'demo-token',
      user: {
        name: email.split('@')[0] || 'Pengguna',
        email,
        joinedAt: '2024-01-01',
      },
    }
  }
}

export async function register({ name, email, password }) {
  try {
    const { data } = await api.post('/register', { name, email, password })
    return data.user || { name, email, joinedAt: new Date().toISOString().slice(0, 10) }
  } catch (error) {
    return { name, email, joinedAt: new Date().toISOString().slice(0, 10) }
  }
}

export async function fetchProfile(token) {
  if (!token) return null
  try {
    const { data } = await api.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
    return data.user || data
  } catch (error) {
    return null
  }
}

export async function logout() {
  return Promise.resolve()
}
