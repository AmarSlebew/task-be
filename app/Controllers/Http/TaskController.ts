import { HttpContext } from '@adonisjs/core/http'
import Task from '../../Models/Task.js'
import jwt from 'jsonwebtoken'

export default class TaskController {

  // GET /tasks
  async index({ request, response }: HttpContext) {

    const authHeader = request.header('Authorization')
    if (!authHeader) {
      return response.unauthorized({ message: 'Token tidak ditemukan!' })
    }

    const token = authHeader.split(' ')[1]
    const decoded: any = jwt.verify(token, String(process.env.APP_KEY))

    const tasks = await Task.find({ userId: decoded.id })
    return response.ok({ message: 'Daftar task berhasil diambil!', tasks })
  }

  // POST /tasks
  async store({ request, response }: HttpContext) {

    const authHeader = request.header('Authorization')
    if (!authHeader) {
      return response.unauthorized({ message: 'Token tidak ditemukan!' })
    }

    const token = authHeader.split(' ')[1]
    const decoded: any = jwt.verify(token, String(process.env.APP_KEY))

    const data = request.only(['title', 'description'])

    const task = await Task.create({
      ...data,
      userId: decoded.id,
    })

    return response.created({ message: 'Task berhasil dibuat!', task })
  }

  // PUT /tasks/:id
  async update({ request, response, params }: HttpContext) {
    const authHeader = request.header('Authorization')
    if (!authHeader) {
      return response.unauthorized({ message: 'Token tidak ditemukan!' })
    }

    const token = authHeader.split(' ')[1]
    const decoded: any = jwt.verify(token, String(process.env.APP_KEY))

    const task = await Task.findById(params.id)

    if (!task) {
      return response.notFound({ message: 'Task tidak ditemukan!' })
    }

    // Pastikan task milik user yg login
    if (task.userId !== decoded.id) {
      return response.forbidden({ message: 'Akses ditolak!' })
    }

    const { title, description } = request.only(['title', 'description'])

    task.title = title ?? task.title
    task.description = description ?? task.description
    await task.save()

    return response.ok({ message: 'Task berhasil diperbarui!', task })
  }

  // DELETE /tasks/:id
  async destroy({ request, response, params }: HttpContext) {
    const authHeader = request.header('Authorization')
    if (!authHeader) {
      return response.unauthorized({ message: 'Token tidak ditemukan!' })
    }

    const token = authHeader.split(' ')[1]
    const decoded: any = jwt.verify(token, String(process.env.APP_KEY))

    const task = await Task.findById(params.id)

    if (!task) {
      return response.notFound({ message: 'Task tidak ditemukan!' })
    }

    // Pastikan task milik user yg login
    if (task.userId !== decoded.id) {
      return response.forbidden({ message: 'Akses ditolak!' })
    }

    await task.deleteOne()

    return response.ok({ message: 'Task berhasil dihapus!' })
  }
}
