# 🧠 SmarTask API – RESTful API Manajemen Tugas + Autentikasi

SmarTask adalah API berbasis **AdonisJS v6 + TypeScript + MongoDB** untuk mengelola:

* Autentikasi pengguna (Register, Login, Profile)
* Manajemen tugas pribadi (Create, Read, Update, Delete)
* Middleware proteksi menggunakan **JWT**

API ini dibuat sebagai implementasi praktik **Rekayasa Perangkat Lunak (RPL)** dan konsep **RESTful API**.

---

## ⚙️ Fitur Utama

| Fitur               | Deskripsi                                                   |
| ------------------- | ----------------------------------------------------------- |
| **Register User**   | Membuat akun baru + hash password dengan bcrypt             |
| **Login User**      | Menghasilkan JWT token sebagai autentikasi                  |
| **Profile User**    | Mengambil profil user berdasarkan token                     |
| **Create Task**     | Menambahkan task baru berdasarkan user login                |
| **Get Tasks**       | Mengambil daftar task milik user                            |
| **Update Task**     | Mengubah task tertentu milik user                           |
| **Delete Task**     | Menghapus task berdasarkan ID                               |
| **Protected Route** | Semua endpoint Task hanya bisa diakses oleh user yang login |

---

## 🏗️ Teknologi yang Digunakan

* **Node.js v20+**
* **AdonisJS v6**
* **TypeScript**
* **MongoDB (Mongoose)**
* **JWT (jsonwebtoken)**
* **bcrypt.js**

---

## 📂 Struktur Folder (Terbaru)

```
taskflow-api/
│
├── app/
│   ├── Controllers/
│   │   └── Http/
│   │       ├── AuthController.ts
│   │       └── TaskController.ts
│   ├── Middleware/
│   ├── Models/
│   │   ├── User.ts
│   │   └── Task.ts
│
├── config/
│   └── ...
│
├── start/
│   ├── routes.ts
│   ├── kernel.ts
│   └── env.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

## 🚀 Cara Menjalankan Proyek

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/taskflow-api.git
cd taskflow-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Konfigurasi `.env`

Buat file `.env`:

### 4️⃣ Jalankan Server

```bash
node ace serve --watch
```

Jika berhasil:

```
[ info ] starting HTTP server...
[ info ] Connected to MongoDB
Server address: http://127.0.0.1:3333
```

---

# 🔐 Autentikasi

## 1️⃣ Register User

**POST** `/register`

```json
{
  "name": "Kelompok8",
  "email": "kelompok8@mail.com",
  "password": "123456"
}
```

## 2️⃣ Login User

**POST** `/login`

```json
{
  "email": "kelompok8@mail.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "Login berhasil!",
  "token": "eyJhbGciOi..."
}
```

## 3️⃣ Get Profile

**GET** `/profile`

Header:

```
Authorization: Bearer <token>
```

---

# 📝 Manajemen Task

## 1️⃣ Create Task

**POST** `/tasks`

Header:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "title": "Belajar AdonisJS",
  "description": "Membuat fitur CRUD"
}
```

## 2️⃣ Get Tasks

**GET** `/tasks`

Header:

```
Authorization: Bearer <token>
```

Response:

```json
{
  "message": "Daftar task berhasil diambil!",
  "tasks": [ ... ]
}
```

## 3️⃣ Update Task

**PUT** `/tasks/:id`

Body:

```json
{
  "title": "Update Judul",
  "description": "Update Deskripsi"
}
```

## 4️⃣ Delete Task

**DELETE** `/tasks/:id`

Response:

```json
{
  "message": "Task berhasil dihapus!"
}
```

---

# 🧪 Pengujian dengan Postman

| Endpoint     | Method | Status | Keterangan           |
| ------------ | ------ | ------ | -------------------- |
| `/register`  | POST   | 201    | Daftar pengguna baru |
| `/login`     | POST   | 200    | Mendapatkan token    |
| `/profile`   | GET    | 200    | Protected route      |
| `/tasks`     | POST   | 201    | Membuat task         |
| `/tasks`     | GET    | 200    | Mengambil semua task |
| `/tasks/:id` | PUT    | 200    | Update task          |
| `/tasks/:id` | DELETE | 200    | Hapus task           |

---

# 🧩 Catatan Pengembangan

* Selalu gunakan **JWT_SECRET yang kuat**.
* Simpan `.env` ke dalam `.gitignore` (jangan pernah di-push).
* Semua task terhubung ke user melalui `userId`.
* Response API menggunakan format JSON yang konsisten.

---

# 🌦 Integrasi API Cuaca (OpenWeather)

SmarTask kini mendukung fitur **pengambilan data cuaca realtime** menggunakan API dari **OpenWeatherMap**. Pengguna dapat mengambil cuaca berdasarkan nama kota melalui endpoint berikut:

### **GET** `/weather/:city`

Contoh:

```
GET /weather/Palu
```

**Response:**

```json
{
  "city": "Palu",
  "temperature": 26,
  "weather": "broken clouds",
  "icon": "04d"
}
```

Untuk mengaktifkan fitur ini, tambahkan API key pada file `.env`:

```
OPENWEATHER_API_KEY=isi_api_key_kamu
```

Dan pastikan koneksi internet aktif agar API dapat mengembalikan data.
