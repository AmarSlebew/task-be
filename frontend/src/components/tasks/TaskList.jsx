import TaskItem from './TaskItem'

export default function TaskList({ tasks, filter, onToggle, onUpdate, onDelete }) {
  const filtered = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'active') return !task.completed
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return new Date(a.dueDate) - new Date(b.dueDate)
  })

  if (!sorted.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-mist/70 backdrop-blur-xl">
        Tidak ada task untuk filter ini.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sorted.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  )
}
