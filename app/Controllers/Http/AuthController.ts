import User from '../../Models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    try {
      const { name, email, password } = request.only(['name', 'email', 'password'])

      if (!name || !email || !password) {
        return response.status(400).json({ message: 'Semua field wajib diisi!' })
      }

      const existing = await User.findOne({ email })
      if (existing) {
        return response.status(400).json({ message: 'Email sudah digunakan!' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({ name, email, password: hashedPassword })
      await user.save()

      return response.status(201).json({
        message: 'User berhasil didaftarkan!',
        user: { name, email },
      })
    } catch (err) {
      console.error(err)
      return response.status(500).json({ message: 'Terjadi kesalahan server.' })
    }
  }

  public async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const user = await User.findOne({ email })

      if (!user) {
        return response.status(404).json({ message: 'User tidak ditemukan.' })
      }

      const isValid = await bcrypt.compare(password, String(user.password))
      if (!isValid) {
        return response.status(400).json({ message: 'Password salah.' })
      }

      const token = jwt.sign(
        { id: user._id.toString(), email: user.email },
        process.env.APP_KEY!,
        { expiresIn: '1h' }
      )

      return response.json({
        message: 'Login berhasil!',
        token,
      })

    } catch (err) {
      console.error(err)
      return response.status(500).json({ message: 'Terjadi kesalahan server.' })
    }
  }

  public async profile({ request, response }: HttpContext) {
    try {
      const authHeader = request.header('authorization')

      if (!authHeader) {
        return response.status(401).json({ message: 'Token tidak ditemukan.' })
      }

      const token = authHeader.replace('Bearer ', '').trim()

      const decoded: any = jwt.verify(token, process.env.APP_KEY!)

      const user = await User.findById(decoded.id)

      if (!user) {
        return response.status(404).json({ message: 'User tidak ditemukan.' })
      }

      return response.status(200).json({
        message: 'Data profil berhasil diambil!',
        user: {
          name: user.name,
          email: user.email,
        },
      })
    } catch (err) {
      console.error('❌ JWT Error:', err)
      return response.status(401).json({ message: 'Token tidak valid atau sudah kadaluarsa.' })
    }
  }
}
