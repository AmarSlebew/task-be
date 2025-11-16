import mongoose from 'mongoose'
import { config } from 'dotenv'

config()
const uri = process.env.MONGO_URL

if (!uri) {
  console.error('❌ MONGO_URL tidak ditemukan! Cek file .env kamu')
} else {
  mongoose
    .connect(uri)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err))
}
