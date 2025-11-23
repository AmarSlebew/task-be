import { useEffect, useState } from 'react'
import Card from '../components/common/Card'
import Modal from '../components/common/Modal'
import TaskForm from '../components/tasks/TaskForm'
import TaskFilters from '../components/tasks/TaskFilters'
import TaskList from '../components/tasks/TaskList'
import WeatherCard from '../components/widgets/WeatherCard'
import QuoteCard from '../components/widgets/QuoteCard'
import { createTask, deleteTask, getTasks, updateTask } from '../services/tasksService'

export default function DashboardPage({ token, user }) {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categories, setCategories] = useState(['Umum'])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getTasks(token)
      setTasks(data)
      const initialCategories = new Set(['Umum'])
      data.forEach((task) => {
        if (task.category) initialCategories.add(task.category)
      })
      setCategories(Array.from(initialCategories))
      setLoading(false)
    }
    load()
  }, [token])

  const handleCreate = async (payload) => {
    const task = await createTask(payload, token)
    setTasks((prev) => [task, ...prev])
    if (task.category) {
      setCategories((prev) => (prev.includes(task.category) ? prev : [...prev, task.category]))
    }
    setIsModalOpen(false)
  }

  const handleToggle = async (id, completed) => {
    const updated = await updateTask(id, { completed }, token)
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)))
  }

  const handleUpdate = async (id, payload) => {
    const updated = await updateTask(id, payload, token)
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)))
  }

  const handleDelete = async (id) => {
    await deleteTask(id, token)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-mist/60">Dashboard</p>
          <h1 className="text-3xl font-semibold text-white">Halo, {user?.name || 'SmarTask User'}</h1>
          <p className="text-sm text-mist/70">Kelola task, pantau cuaca, dan dapatkan motivasi harian.</p>
        </div>
        <TaskFilters value={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <WeatherCard />
        <QuoteCard />
      </div>

      <Card className="p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Task Saya</h2>
            <p className="text-sm text-mist/70">Tambah, edit, tandai selesai, atau hapus task Anda.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-mist/70 border border-white/10">
              {loading ? 'Memuat...' : `${tasks.length} task`}
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-primary/90 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-primary"
            >
              Tambah Tugas
            </button>
          </div>
        </div>

        <TaskList tasks={tasks} filter={filter} onToggle={handleToggle} onUpdate={handleUpdate} onDelete={handleDelete} />
      </Card>

      <Modal
        open={isModalOpen}
        title="Tambah Tugas"
        onClose={() => setIsModalOpen(false)}
        actions={null}
      >
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
          categories={categories}
          onAddCategory={(name) => setCategories((prev) => (prev.includes(name) ? prev : [...prev, name]))}
        />
      </Modal>

    </div>
  )
}
