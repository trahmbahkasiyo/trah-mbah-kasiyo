# Web Silsilah Keluarga Besar Kasio Mertodimbejo & Ngatinem Mertodimbejo

## Deskripsi
Website statis ini dibuat untuk mendokumentasikan, melestarikan, dan memvisualisasikan silsilah keluarga besar dari Kasio Mertodimbejo & Ngatinem Mertodimbejo yang berasal dari Dsn. Ngronggo, Ds. Getas, Kec. Playen, Kab. Gunung Kidul - D.I. Yogyakarta. Website ini dirancang untuk dijalankan menggunakan GitHub Pages.

## Fitur Utama
*   **Halaman Beranda:** Menampilkan diagram silsilah keluarga utama (gambar statis interaktif) dan informasi umum (Kata Pengantar, Tingkatan Generasi).
*   **Halaman Cabang Keluarga:** Halaman individual untuk setiap anak (Kasiran s/d Pasinem) dengan banner, diagram silsilah statis interaktif, dan profil singkat.
*   **Halaman Diagram Keluarga Besar:** Menampilkan diagram gambar format besar dengan fitur interaktif dan tombol download.
*   **Halaman Galeri & Informasi:**
    *   **Galeri Foto Dinamis:** Menampilkan thumbnail foto dari `data/galeri.json` dalam grid responsif.
    *   **Lightbox Foto:** Menampilkan gambar ukuran penuh saat thumbnail diklik.
    *   **Pengumuman Dinamis:** Menampilkan daftar pengumuman terbaru dari `data/updates.json`.
    *   **Fitur Baca Selengkapnya:** Membatasi tampilan pengumuman awal dengan opsi untuk melihat semua atau memperkecil.
    *   Informasi Kontak, Struktur Generasi, dan Sejarah Singkat.
*   **Interaksi Diagram Gambar:** Fitur Zoom In, Zoom Out, Geser (Pan), Reset, dan Export/Download pada gambar diagram.
*   **Pencarian & Filter:** Input pencarian nama dan opsi filter berdasarkan Generasi dan Jenis Kelamin di sidebar (fungsionalitas JS lanjutan belum terintegrasi penuh).
*   **Navigasi Sidebar:** Menu untuk akses mudah antar halaman.

## Teknologi yang Digunakan
*   HTML5
*   CSS3 (termasuk Flexbox dan Grid untuk layout)
*   JavaScript (Vanilla JS - ES6+) untuk interaktivitas diagram, DOM manipulation, dan pemuatan data JSON dinamis (`fetch`).
*   Data Silsilah & Konten Dinamis: File JSON statis (`data/silsilah.json`, `data/updates.json`, `data/galeri.json`).
*   Hosting: GitHub Pages.

## Struktur Generasi
Mencakup 18 tingkatan generasi dalam tradisi Jawa:
1.  Anak
2.  Putu (Cucu)
3.  Buyut (Cicit)
4.  Canggah
5.  Wareng
6.  Udhek-udhek
7.  Gantung siwur
8.  Cicip Moning
9.  Petarangan Bobrok
10. Gropak Senthe
11. Gropak Waton
12. Cendheng
13. Giyeng
14. Cumpleng
15. Ampleng
16. Menyaman
17. Menya Menya
18. Trah Tumerah

## Struktur Folder
📁 WebTrah
├── 📁 css
│   └── style.css
├── 📁 data
│   ├── silsilah.json
│   └── updates.json
├── 📁 img
│   ├── banner.jpg
│   ├── family-diagram.png
│   ├── logo.png
│   └── placeholder.png
├── 📁 js
│   ├── main.js
│   ├── script.js
│   ├── silsilah-manager.js
│   └── updates.js
├── index.html
├── silsilah.html
├── README.md
└── development.md

## Cara Menjalankan Lokal
1.  **Menggunakan Ekstensi Live Server (VS Code):**
    *   Install ekstensi "Live Server".
    *   Klik kanan pada file `index.html` di VS Code -> Pilih "Open with Live Server".
2.  **Menggunakan Python:**
    *   Buka terminal/cmd di folder proyek `WebTrah`.
    *   Jalankan: `python -m http.server 8000` (atau port lain).
    *   Buka browser dan akses `http://localhost:8000`.
3.  **Membuka File Langsung:**
    *   Klik dua kali file `index.html`. (Mungkin mengalami masalah jika ada pemuatan data JSON via fetch).

## Cara Penggunaan
*   Gunakan menu di sidebar kiri untuk navigasi antar halaman (Beranda, cabang keluarga).
*   Gunakan fitur pencarian dan filter di sidebar untuk mencari anggota keluarga (memerlukan implementasi JS lebih lanjut pada `silsilah-manager.js`).
*   Pada halaman yang menampilkan diagram silsilah (gambar), gunakan tombol Zoom In/Out, Reset, dan Export. Klik dan tahan pada gambar untuk menggesernya.

## Kontributor
*   Wiyadi (Desain Awal & Inisiator)
*   [Nama Anda/Pengembang Selanjutnya]
