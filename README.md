# Rasa Nusantara: Soto
## Web Story tentang Soto sebagai Cerminan Keberagaman Indonesia

---

## Identitas Tim

### Anggota Tim: Kicau Mania Team

| Nama Lengkap | NIM | Kelas |
|---|---|---|
| Sabila Bintang Kusuma Dewi | 222313323 | 3SI2 |
| Qurany Nadhira Tsabita | 222313363 | 3SI2 |

---

## Deskripsi Proyek

Rasa Nusantara: Soto adalah sebuah web story interaktif yang mengajak pengguna menjelajahi keberagaman soto di Indonesia. Dari Sabang hingga Merauke, soto hadir dalam ratusan wajah berbeda, masing-masing membawa identitas daerah, bahan lokal, dan filosofi tersendiri.

Web story ini mengisahkan perjalanan soto dari enam daerah utama di Indonesia: Soto Betawi dari DKI Jakarta, Soto Lamongan dari Jawa Timur, Soto Kudus dari Jawa Tengah, Soto Padang dari Sumatera Barat, Soto Banjar dari Kalimantan Selatan, dan Coto Makassar dari Sulawesi Selatan.

---

## Alasan Pemilihan Topik

Soto dipilih sebagai topik utama karena beberapa alasan:

Pertama, soto adalah salah satu makanan paling representatif di Indonesia. Hampir setiap daerah memiliki versi sotonya sendiri, menjadikannya simbol nyata dari semboyan "Bhinneka Tunggal Ika."

Kedua, keberagaman soto mencerminkan keberagaman budaya. Perbedaan kuah, isian, cara penyajian, dan filosofi di balik setiap mangkuk soto adalah cerminan dari kekayaan budaya dan kearifan lokal masing-masing daerah.

Ketiga, soto bersifat universal. Semua kalangan mengenal soto, sehingga topik ini mudah diterima dan relevan bagi seluruh lapisan masyarakat Indonesia.

---

## Fitur Utama

**Opening Section**
Pengenalan cerita dengan animasi scroll yang memperkenalkan konsep "flavors are never the same" melalui visual retro dan efek typewriter.

**The Question Section**
Eksplorasi pertanyaan "What makes them all soto?" melalui tiga scene interaktif yang didukung animasi GSAP.

**Journey Section**
Perjalanan horizontal menjelajahi enam jenis soto dari berbagai daerah, dilengkapi profil kuliner lengkap setiap soto.

**Unity Section**
Visualisasi kesatuan di balik keberagaman, menggunakan animasi mangkuk dan bahan-bahan yang bergerak dinamis.

**Meaning Section**
Pemaknaan filosofis tentang soto sebagai cerminan bangsa, dengan animasi scroll berbasis Framer Motion.

**Closing Section**
Penutup cerita dengan pesan "Every bowl tells a story. Now, it's your turn to create one."

**Make Your Own Soto**
Permainan interaktif memilih kuah, isian, taburan, dan topping untuk membuat soto kreasi sendiri, dengan sistem drag-and-drop.

**About Us**
Profil anggota tim dengan animasi typewriter dan transisi yang halus.

**Section Transitions**
Setiap perpindahan seksi menggunakan animasi transisi unik: Steam Rise, Liquid Splash, Filmstrip Pull, Spice Splash, Ingredient Morph, Bowl Wipe, Tablecloth Pull, Steam Curtain.

---

## Cara Instalasi dan Menjalankan Web

### Persyaratan Sistem

Sebelum menginstal, pastikan perangkat Anda memiliki:

- Node.js versi 18 atau lebih baru
- npm versi 9 atau lebih baru (atau pnpm / yarn)
- Browser modern (Chrome 100+, Firefox 100+, Edge 100+, Safari 16+)

Untuk memeriksa versi Node.js yang terpasang:

```bash
node --version
npm --version
```

### Langkah Instalasi

**1. Clone atau Unduh Repositori**

Jika menggunakan Git:
```bash
git clone https://github.com/username/soto_project.git
cd soto_project
```

Atau unduh dan ekstrak file ZIP repositori, kemudian masuk ke direktori tersebut.

**2. Instal Dependensi**

```bash
npm install
```

Perintah ini akan mengunduh semua dependensi yang diperlukan, termasuk:
- React 19
- Vite 8
- GSAP 3 (animasi scroll)
- Framer Motion 12 (animasi berbasis React)
- Tailwind CSS 4

Proses instalasi membutuhkan koneksi internet dan memakan waktu beberapa menit.

**3. Jalankan Server Development**

```bash
npm run dev
```

Setelah berhasil, terminal akan menampilkan:

```
  VITE v8.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

**4. Buka di Browser**

Buka browser dan akses:
```
http://localhost:5173
```

### Build untuk Production

Untuk membuat versi production yang siap deploy:

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`. Untuk melihat preview hasil build:

```bash
npm run preview
```

### Struktur Perintah Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server development dengan hot reload |
| `npm run build` | Membuat bundle production |
| `npm run preview` | Preview hasil build production secara lokal |
| `npm run lint` | Menjalankan ESLint untuk memeriksa kualitas kode |

---

## Struktur Proyek

```
soto_project/
├── public/
│   └── logoweb.svg
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── BeachflyFreeTrial.ttf
│   │   │   ├── InriaSerif-Regular.ttf
│   │   │   ├── Mathreal.ttf
│   │   │   └── ...
│   │   └── images/
│   │       ├── soto-betawi.webp
│   │       ├── soto-lamongan.webp
│   │       └── ...
│   ├── data/
│   │   └── storytext.js
│   ├── hooks/
│   │   └── useSectionTransition.js
│   ├── sections/
│   │   ├── header.jsx
│   │   ├── question.jsx
│   │   ├── journey.jsx
│   │   ├── unity.jsx
│   │   ├── meaning.jsx
│   │   ├── closing.jsx
│   │   ├── makeyourown.jsx
│   │   ├── about.jsx
│   │   ├── footer.jsx
│   │   ├── scrollnavigator.jsx
│   │   └── SectionTransitions.jsx
│   ├── transitions/
│   │   └── transitionconfig.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Teknologi yang Digunakan

**Framework dan Library Utama**

- React 19 - Library utama untuk membangun antarmuka pengguna
- Vite 8 - Build tool dan development server
- Tailwind CSS 4 - Utility-first CSS framework

**Animasi**

- GSAP 3 dengan ScrollTrigger - Untuk animasi scroll-driven yang kompleks, horizontal scrolling pada Journey Section, dan pin sections
- GSAP MotionPathPlugin - Untuk animasi jalur melengkung pada Unity Section
- Framer Motion 12 - Untuk animasi berbasis React pada Meaning Section

**Font**

- Beachfly Free Trial - Font display untuk elemen dekoratif
- Mathreal - Font untuk jedul dan elemen naratif
- Inria Serif - Font serif untuk body text dan deskripsi

---

## Tampilan Web

### Tampilan Desktop (1920 x 1080)

Pada layar desktop, web story menampilkan layout penuh dengan:
- Navigation dots di sisi kanan layar untuk navigasi cepat antar section
- Journey Section menampilkan kartu soto secara horizontal dengan dua panel samping kiri dan kanan
- About Section menampilkan foto dan teks secara berdampingan (side by side)
- Make Your Own Soto menampilkan panel bahan di kiri dan kanan mangkuk

### Tampilan Tablet (768 x 1024)

Pada layar tablet:
- Journey Section beralih ke layout kolom (foto di atas, teks di bawah)
- About Section beralih ke layout vertikal
- Make Your Own Soto menyembunyikan panel samping dan menggunakan tray horizontal di bawah

### Tampilan Mobile (375 x 812)

Pada layar mobile:
- Navigation bar berubah menjadi dot indicator di bagian bawah layar
- Semua konten ditampilkan dalam satu kolom
- Ukuran teks dan elemen menyesuaikan menggunakan nilai `clamp()` untuk keterbacaan optimal
- Make Your Own Soto menggunakan tray scroll horizontal untuk memilih bahan

---

> Catatan: File screenshot belum tersedia dalam repositori ini karena web berjalan secara lokal. Silakan jalankan web menggunakan langkah instalasi di atas untuk melihat tampilan lengkapnya.

---

## Kontribusi Anggota Tim

**Sabila Bintang Kusuma Dewi (222313323)**

Bertanggung jawab atas konten dan isi website, mulai dari riset informasi tentang enam jenis soto yang ditampilkan, penulisan narasi untuk setiap section, pembuatan data profil kuliner lengkap (karakter kuah, ciri khas, penyajian), hingga penulisan teks dalam storytext.js.

**Qurany Nadhira Tsabita (222313363)**

Bertanggung jawab atas implementasi teknis website, mencakup Opening Section, Closing Section, Footer, permainan interaktif Make Your Own Soto, About Us Section, sistem scroll navigation, dan animasi transisi antar section.

---

## Kontak

Untuk pertanyaan atau informasi lebih lanjut, silakan hubungi:

- Sabila Bintang Kusuma Dewi: 222313323@stis.ac.id
- Qurany Nadhira Tsabita: 222313363@stis.ac.id

---

## Lisensi

Proyek ini dibuat untuk keperluan  Web Design Paradoks di Politeknik Statistika STIS. Font Beachfly, Mathreal dan Inria Serif digunakan berdasarkan lisensi Free Trial.

---

Kicau Mania Team - Politeknik Statistika STIS - 2026
