// config/mongo.ts
import env from '#start/env'
import mongoose from 'mongoose'

export async function initMongo() {
  try {
    await mongoose.connect(env.get('MONGO_URI'), {
      dbName: env.get('MONGO_DB_NAME'),
    })

    console.log('Berhasil terkoneksi ke MongoDB Atlas')
  } catch (err) {
    console.error('MongoDB gagal terkoneksi', err)
  }
}

export default mongoose
