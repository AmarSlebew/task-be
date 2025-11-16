import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  deadline: Date,
  status: { type: String, default: 'belum selesai' },
  created_at: { type: Date, default: Date.now },
})

export default mongoose.model('Task', taskSchema)
