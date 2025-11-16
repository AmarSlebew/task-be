import type { HttpContext } from '@adonisjs/core/http'
import Task from '../Models/Task.js'
import jwt from 'jsonwebtoken'

export default class TaskController {
  async index({ request, response }: HttpContext) {
    const token = request.header('Authorization')?.replace('Bearer ', '') ?? ''
    const decoded = jwt.verify(token, String(process.env.APP_KEY)) as { id: string }
    const tasks = await Task.find({ user_id: decoded.id })
    return response.json(tasks)
  }

  async store({ request, response }: HttpContext) {
    const token = request.header('Authorization')?.replace('Bearer ', '') ?? ''
    const decoded = jwt.verify(token, String(process.env.APP_KEY)) as { id: string }
    const data = request.only(['title', 'description', 'deadline'])
    const task = await Task.create({ ...data, user_id: decoded.id })
    return response.json(task)
  }

  async update({ params, request, response }: HttpContext) {
    const task = await Task.findByIdAndUpdate(params.id, request.body, { new: true })
    return response.json(task)
  }

  async destroy({ params, response }: HttpContext) {
    await Task.findByIdAndDelete(params.id)
    return response.json({ message: 'Tugas dihapus' })
  }
}
