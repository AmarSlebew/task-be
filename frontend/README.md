# SmarTask Frontend (React + Tailwind)

Antarmuka React bertema modern (mode gelap & terang) dengan gaya glassmorphic yang memanfaatkan palet warna lama (canvas/mist/primary/accent) untuk mengakses API SmarTask. Aplikasi terdiri dari halaman Login, Register, Dashboard, dan Profile yang saling terhubung lewat routing.

## Fitur
- **Autentikasi lengkap**: Halaman login modern dengan tip demo dan halaman register terpisah. Sesi disimpan di `localStorage` dan rute Dashboard/Profile dilindungi.
- **Dashboard tugas kaya konteks**:
  - Widget **Weather Today** dan **Motivation Quote** berada di bagian atas dashboard dengan kartu gradient modern, fallback jika lokasi/permintaan gagal, serta tombol refresh.
  - **Task board**: tombol **Tambah Tugas** membuka pop-up form (judul, deskripsi, tanggal jatuh tempo, kategori bebas/dinamis), edit inline, hapus, toggle status selesai, filter all/active/completed, dan urut otomatis berdasarkan tanggal terdekat.
- **Kategori Dinamis**: Bisa memilih kategori yang ada atau menambahkan kategori baru langsung dari pop-up tambah tugas; kategori otomatis muncul di daftar filter tugas berikutnya.
- **Profil Pengguna**: Kartu informasi nama, email, tanggal join dummy, status aktif, serta tombol logout.
- **Tema Modern Konsisten**: Palet warna lama dipertahankan dengan efek kaca, shadow glow, serta toggle **mode terang/gelap** agar nyaman dipakai lama di berbagai kondisi cahaya.

## Teknologi & tema
- **React + Vite** dengan routing `react-router-dom` dan HTTP client `axios`.
- **Tailwind CSS v4**: menggunakan satu baris `@import "tailwindcss";` pada `src/index.css` plus deklarasi `@theme` untuk palet warna lama (canvas, mist, surface, overlay, primary, accent, success, amber, danger) dan shadow/glassmorphism. Mode terang/gelap diatur lewat class `.theme-light` pada `document.documentElement`.
- **Vite plugin Tailwind**: konfigurasi di `vite.config.js` memakai `@tailwindcss/vite`; tidak diperlukan file `tailwind.config.js` atau `postcss.config.js` tambahan.

## Menjalankan

1. Masuk ke folder `frontend`.
2. Install dependency (butuh akses internet untuk npm registry):
   ```bash
   npm install
   ```
3. Jalankan mode pengembangan:
   ```bash
   npm run dev
   ```
4. Aplikasi akan tersedia pada `http://localhost:5173` secara default.

## Variabel Lingkungan

Buat file `.env` di folder `frontend` bila perlu untuk menyesuaikan base URL API:

```
VITE_API_BASE_URL=http://localhost:3333
```

Jika tidak diisi, aplikasi menggunakan `http://localhost:3333` secara default.

## Routing
- `/login` — form login (email & password, validasi required)
- `/register` — form daftar akun baru
- `/dashboard` — manajemen tugas (list, tambah via pop-up + kategori custom, edit, hapus, toggle status, filter), cuaca, dan quote motivasi
- `/profile` — info user dan tombol logout

## Apa yang diubah untuk memenuhi prompt terbaru
- Memindahkan form tambah tugas ke dalam pop-up khusus dengan dukungan kategori baru yang langsung tersimpan di opsi filter.
- Menyederhanakan layout dashboard agar hanya berisi tombol tambah tugas, daftar tugas, filter, serta widget cuaca dan quote di bagian atas.
- Menambahkan mode terang sebagai pasangan tema gelap agar pengalaman menggunakan aplikasi lebih nyaman di berbagai kondisi.
- Menjaga palet warna lama (canvas/mist/primary/accent) sekaligus memodernkan komponen inti (kartu, tombol, input) supaya konsisten di semua halaman.
