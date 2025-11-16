# 🧠 SmarTask API – Aplikasi Pengingat dan Manajemen Tugas Pribadi

SmarTask adalah API berbasis **AdonisJS + MongoDB** yang dirancang untuk mengelola autentikasi pengguna dan data profil secara aman menggunakan **JSON Web Token (JWT)**.  
Proyek ini dibangun sebagai implementasi konsep dasar **RESTful API** untuk mata kuliah *Rekayasa Perangkat Lunak (RPL)*.

---

## ⚙️ Fitur Utama

| Fitur              | Deskripsi                                                                        |
|--------------------|----------------------------------------------------------------------------------|
| **Register User**  | Mendaftarkan pengguna baru dengan hashing password menggunakan `bcrypt`          |
| **Login User**     | Autentikasi pengguna dan pembuatan token JWT                                     |
| **Profile User**   | Mengambil data profil pengguna yang sedang login (protected route)               |
| **Error Handling** | Menangani kesalahan seperti user tidak ditemukan, password salah, token invalid  |

---

## 🏗️ Teknologi yang Digunakan
- **Node.js (v20+)**
- **AdonisJS (v6)**
- **MongoDB (Mongoose)**
- **JWT (jsonwebtoken)**
- **bcrypt.js**
- **TypeScript**

---

## 📁 Struktur Folder

```
taskflow-api/
│
├── app/
│   ├── Controllers/
│   │   └── Http/
│   │       └── AuthController.ts
│   ├── Models/
│   │   └── User.ts
│
├── config/
│   └── database.ts
│
├── start/
│   └── routes.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

## 🚀 Cara Menjalankan Proyek

1. **Clone repo atau buka folder project**
   ```bash
   git clone https://github.com/username/taskflow-api.git
   cd taskflow-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Atur file `.env`**
   ```env
   PORT=3333
   HOST=127.0.0.1
   NODE_ENV=development
   APP_KEY=some_random_key
   JWT_SECRET=secret123
   DB_CONNECTION=mongodb
   MONGO_URI=mongodb://localhost:27017/smartask_db
   ```

4. **Jalankan server**
   ```bash
   node ace serve --watch
   ```

5. Jika berhasil, terminal akan menampilkan:
   ```
   [ info ] starting HTTP server...
   [ info ] Connected to MongoDB
   Server address: http://127.0.0.1:3333
   ```

---

## 🔐 Endpoint API

### **1️⃣ Register User**
**POST** `http://127.0.0.1:3333/register`

**Body (JSON):**
```json
{
  "name": "Kelompok8",
  "email": "kelompok8@mail.com",
  "password": "123456"
}
```

**Response (201):**
```json
{
  "message": "User berhasil didaftarkan!",
  "user": {
    "name": "Kelompok8",
    "email": "kelompok8@mail.com"
  }
}
```

---

### **2️⃣ Login User**
**POST** `http://127.0.0.1:3333/login`

**Body (JSON):**
```json
{
  "email": "kelompok8@mail.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "message": "Login berhasil!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **3️⃣ Get Profile (Protected Route)**
**GET** `http://127.0.0.1:3333/profile`

**Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "message": "Data profil berhasil diambil!",
  "user": {
    "name": "Kelompok8",
    "email": "kelompok8@mail.com"
  }
}
```

---

## 🧪 Pengujian dengan Postman

| Endpoint    | Method   | Status            | Deskripsi                           |
|-----------  |--------- |-----------------  |-------------------------------------|
| `/register` | POST     | ✅ 201 Created    | User baru berhasil didaftarkan      |
| `/login`    | POST     | ✅ 200 OK         | Login sukses dan token dikembalikan |
| `/profile`  | GET      | ✅ 200 OK         | Token valid, data user ditampilkan  |

---

## 🧩 Catatan Pengembangan
- Gunakan library `bcrypt` untuk keamanan password.
- Gunakan `JWT_SECRET` yang unik dan rahasia di file `.env`.
- Token akan kadaluarsa setelah **1 jam** (`expiresIn: '1h'`).
- Semua endpoint menggunakan format **JSON response** agar mudah diintegrasikan dengan frontend.
