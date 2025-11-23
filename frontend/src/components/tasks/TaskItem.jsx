import { useState } from 'react'
import Button from '../common/Button'

export default function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [category, setCategory] = useState(task.category || 'Umum')
  const [dueDate, setDueDate] = useState(task.dueDate || '')

  const handleSave = () => {
    if (!title.trim()) return
    onUpdate(task.id, { title, description, category, dueDate })
    setEditing(false)
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-mist shadow-card backdrop-blur-xl md:flex-row md:items-start md:justify-between">
      <div className="flex-1 space-y-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id, !task.completed)}
            className="mt-1 h-5 w-5 rounded-md border-white/20 bg-surface text-primary focus:ring-primary/50"
          />
          <div className="flex-1 space-y-2">
            {editing ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-overlay px-3 py-2 text-base text-white focus:border-primary/50 focus:outline-none"
              />
            ) : (
              <p className={`text-base font-semibold ${task.completed ? 'text-mist/50 line-through' : 'text-white'}`}>{task.title}</p>
            )}
            {editing ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-white/10 bg-overlay px-3 py-2 text-sm text-white focus:border-primary/50 focus:outline-none"
              />
            ) : (
              <p className="text-mist/70">{description || 'Tidak ada deskripsi'}</p>
            )}
            <div className="flex flex-wrap gap-2 text-xs text-mist/70">
              {editing ? (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-full border border-white/10 bg-overlay px-3 py-2 text-sm text-mist focus:border-primary/50 focus:outline-none"
                >
                  <option>Umum</option>
                  <option>Planning</option>
                  <option>Design</option>
                  <option>Development</option>
                  <option>Testing</option>
                  {category && !['Umum', 'Planning', 'Design', 'Development', 'Testing'].includes(category) && (
                    <option value={category}>{category}</option>
                  )}
                </select>
              ) : (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/30">
                  {category || 'Umum'}
                </span>
              )}
              {editing ? (
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="rounded-full border border-white/10 bg-overlay px-3 py-2 text-sm text-mist focus:border-primary/50 focus:outline-none"
                />
              ) : (
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-mist border border-white/10">
                  Jatuh tempo: {dueDate || 'Belum diatur'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {editing ? (
          <>
            <Button onClick={handleSave} className="bg-primary/90 hover:bg-primary px-3 py-2">
              Simpan
            </Button>
            <Button onClick={() => setEditing(false)} className="bg-overlay px-3 py-2 text-mist hover:text-white">
              Batal
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEditing(true)} className="bg-overlay px-3 py-2 text-mist hover:text-white">
              Edit
            </Button>
            <Button onClick={() => onDelete(task.id)} className="bg-danger/80 hover:bg-danger px-3 py-2">
              Hapus
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
