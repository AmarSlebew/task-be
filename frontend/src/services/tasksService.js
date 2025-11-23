import api from './api'

const fallbackTasks = [
  {
    id: '1',
    title: 'Susun backlog mingguan',
    description: 'Prioritaskan fitur dan bug untuk sprint berikutnya.',
    completed: false,
    category: 'Planning',
    dueDate: '2024-12-18',
  },
  {
    id: '2',
    title: 'Review UI Dashboard',
    description: 'Cek konsistensi warna dan tipografi.',
    completed: true,
    category: 'Design',
    dueDate: '2024-12-20',
  },
]

export async function getTasks(token) {
  try {
    const { data } = await api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } })
    const list = data.tasks || data || []
    return list.map((item) => ({
      id: item._id || item.id,
      title: item.title,
      description: item.description,
      completed: item.completed,
      category: item.category,
      dueDate: item.dueDate,
    }))
  } catch (error) {
    return fallbackTasks
  }
}

export async function createTask(payload, token) {
  try {
    const { data } = await api.post('/tasks', payload, { headers: { Authorization: `Bearer ${token}` } })
    const task = data.task || data
    return {
      id: task._id || task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      category: task.category,
      dueDate: task.dueDate,
    }
  } catch (error) {
    return {
      id: crypto.randomUUID(),
      title: payload.title,
      description: payload.description,
      completed: false,
      category: payload.category || 'Umum',
      dueDate: payload.dueDate || new Date().toISOString().slice(0, 10),
    }
  }
}

export async function updateTask(id, payload, token) {
  try {
    const { data } = await api.put(`/tasks/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } })
    const task = data.task || data
    return {
      id: task._id || task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      category: task.category,
      dueDate: task.dueDate,
    }
  } catch (error) {
    return {
      id,
      title: payload.title,
      description: payload.description,
      completed: payload.completed ?? false,
      category: payload.category,
      dueDate: payload.dueDate,
    }
  }
}

export async function deleteTask(id, token) {
  try {
    await api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    return true
  } catch (error) {
    return true
  }
}
