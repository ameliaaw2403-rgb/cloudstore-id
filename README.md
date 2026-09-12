# Cloud,Store.id - Login & Admin Panel

Sistem login dan panel admin untuk mengelola akun pengguna Cloud,Store.id. Aplikasi ini dibangun dengan HTML, CSS, dan JavaScript vanilla tanpa backend.

## 🌐 Fitur

### Login Page (index.html)
- ✅ Form login dengan nomor telepon dan password
- ✅ Toggle show/hide password
- ✅ Desain modern dan responsif
- ✅ Link ke halaman pendaftaran
- ✅ Link ke panel admin

### Admin Panel (admin.html)
- ✅ Dashboard dengan statistik pengguna
- ✅ Kelola akun pengguna (tampil, search, filter)
- ✅ Buat akun pengguna baru
- ✅ Edit data pengguna
- ✅ Hapus akun pengguna
- ✅ Lihat statistik sistem
- ✅ Design responsif untuk mobile

## 🚀 Cara Menggunakan

### 1. Buka Aplikasi
- **Login Page**: Buka `index.html` di browser
- **Admin Panel**: Klik "Panel Admin" di halaman login, atau buka `admin.html` langsung

### 2. Login Admin
- Password admin default: `admin123`
- Masukkan password saat diminta

### 3. Dashboard
Halaman pertama yang menampilkan:
- Total pengguna terdaftar
- Pengguna aktif
- Akun terblokir
- Akun yang dibuat hari ini

### 4. Kelola Akun
- **Tampilkan semua akun** dalam tabel
- **Search** berdasarkan nomor telepon atau nama
- **Filter** berdasarkan status (Aktif, Tidak Aktif, Terblokir)
- **Edit** informasi pengguna
- **Hapus** akun pengguna

### 5. Buat Akun Baru
Form untuk membuat akun dengan validasi:
- Nomor telepon (tidak boleh duplikat)
- Nama lengkap
- Email
- Password (minimal 6 karakter)
- Status akun (Aktif/Tidak Aktif)

### 6. Statistik
Menampilkan:
- Total login hari ini
- Rata-rata aktivitas
- Akun baru bulan ini
- Waktu server real-time

## 📁 Struktur File

```
cloudstore-id/
├── index.html           # Halaman login utama
├── style.css            # Style untuk login page
├── script.js            # Script untuk login page
├── admin.html           # Halaman admin panel
├── admin-style.css      # Style untuk admin panel
├── admin-script.js      # Script untuk admin panel
└── README.md            # Dokumentasi
```

## 💾 Penyimpanan Data

Data pengguna disimpan di **localStorage** browser:
- Semua data tersimpan lokal di device
- Data tidak hilang saat refresh halaman
- Data akan hilang jika cache browser dihapus

**Pengguna default (demo):**
1. Nomor: 08123456789 | Nama: Budi Santoso | Email: budi@example.com
2. Nomor: 08987654321 | Nama: Siti Nurhaliza | Email: siti@example.com

## 🔒 Keamanan

⚠️ **PERHATIAN**: Aplikasi ini adalah demo. Untuk production:
- Gunakan backend server yang aman
- Hash password menggunakan algoritma yang aman
- Implementasikan JWT/session authentication
- Gunakan HTTPS untuk koneksi
- Validasi data di server
- Implementasikan rate limiting

## 🎨 Desain

- **Color Scheme**: Purple & Blue gradient
- **Responsive**: Mobile-friendly design
- **UI Components**: Modal, badges, buttons, forms
- **Accessibility**: ARIA labels, semantic HTML

## 📱 Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## 🔧 Teknologi

- **HTML5** - Struktur
- **CSS3** - Styling (Flexbox, Grid, Gradients)
- **JavaScript (ES6+)** - Interaktivitas
- **LocalStorage** - Data persistence

## 🌍 Deploy

Anda bisa deploy aplikasi ini ke:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Hosting statis lainnya

## 📝 Lisensi

MIT License - Bebas digunakan untuk keperluan apapun

## 👨‍💻 Dibuat oleh

Cloud,Store.id Development Team

---

**Catatan**: Aplikasi ini adalah versi demo. Koneksi backend belum dikonfigurasi. Gunakan sebagai template dan integrasikan dengan server Anda sendiri untuk production use.