import { useMemo, useState } from 'react'
import Button from '../common/Button'
import TextInput from '../common/TextInput'

export default function TaskForm({ onSubmit, onCancel, categories = [], onAddCategory }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Umum')
  const [newCategory, setNewCategory] = useState('')
  const [dueDate, setDueDate] = useState('')

  const mergedCategories = useMemo(() => {
    const base = new Set(['Umum', ...categories.filter(Boolean)])
    return Array.from(base)
  }, [categories])

  const effectiveCategory = newCategory.trim() || category

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const payload = {
      title,
      description,
      category: effectiveCategory,
      dueDate: dueDate || new Date().toISOString().slice(0, 10),
    }
    onSubmit(payload)
    if (newCategory.trim() && onAddCategory) {
      onAddCategory(newCategory.trim())
    }
    setTitle('')
    setDescription('')
    setCategory('Umum')
    setNewCategory('')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Judul"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Rancang UI Dashboard"
          required
        />
        <TextInput
          label="Deskripsi"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tambahkan detail singkat"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-mist/80">
          <span className="mb-2 block text-xs font-semibold tracking-[0.18em] text-mist/50">Kategori</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {mergedCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
            <option value="custom">Tambah kategori baru...</option>
          </select>
        </label>

        <TextInput
          label="Tanggal Jatuh Tempo"
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {category === 'custom' && (
        <TextInput
          label="Nama Kategori Baru"
          name="newCategory"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Misal: Dokumentasi"
          required
        />
      )}

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button type="button" onClick={onCancel} className="bg-overlay px-4 py-2 text-mist hover:text-white">
          Batal
        </Button>
        <Button type="submit" className="bg-primary/90 hover:bg-primary px-4 py-2 text-white">
          Tambah Tugas
        </Button>
      </div>
    </form>
  )
}
