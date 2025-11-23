import { useState } from 'react'

function TaskItem({ task, onUpdate, onDelete, busy }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [error, setError] = useState('')

  const handleUpdate = async () => {
    setError('')
    try {
      await onUpdate(task._id, { title, description })
      setIsEditing(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async () => {
    setError('')
    try {
      await onDelete(task._id)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <li className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-indigo-900/20 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          {isEditing ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
              />
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" aria-hidden />
                <h4 className="text-lg font-semibold text-white">{task.title}</h4>
              </div>
              <p className="text-slate-200/80 whitespace-pre-line">{task.description || 'Tidak ada deskripsi'}</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={busy}
                className="px-3 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 disabled:opacity-60 shadow-md shadow-emerald-500/30"
              >
                Simpan
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setTitle(task.title)
                  setDescription(task.description)
                  setError('')
                }}
                className="px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 border border-white/10"
              >
                Batal
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-2 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 shadow-md shadow-indigo-500/30"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={busy}
                className="px-3 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-400 disabled:opacity-60 shadow-md shadow-rose-500/30"
              >
                Hapus
              </button>
            </>
          )}
        </div>
      </div>
      {error && <p className="text-sm text-rose-100 bg-rose-500/20 border border-rose-500/30 p-3 rounded-xl">{error}</p>}
    </li>
  )
}

export default function TaskList({ tasks, onUpdate, onDelete, busy }) {
  if (!tasks.length) {
    return (
      <p className="text-slate-200/80 rounded-2xl border border-dashed border-white/15 bg-white/5 p-4 text-sm">
        Belum ada task. Tambahkan task baru untuk memulai.
      </p>
    )
  }

  return (
    <ul className="grid gap-3">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} busy={busy} />
      ))}
    </ul>
  )
}
