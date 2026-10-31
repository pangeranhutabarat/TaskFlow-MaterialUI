# TaskFlow – Tugas Mandiri PAW (Material UI)

Aplikasi React dengan **2 halaman** (Dashboard dan Daftar Tugas), menggunakan komponen Material UI dan tema custom (`createTheme` + `ThemeProvider`).

## Menjalankan di VSCode

1. Install Node.js versi LTS bila belum ada.
2. Buka folder `taskflow` di VSCode (File > Open Folder).
3. Buka terminal di VSCode (Terminal > New Terminal).
4. Jalankan:

```bash
npm install
npm run dev
```

5. Buka URL localhost yang tercantum di terminal (biasanya `http://localhost:5173`).

## Fitur

- Dashboard: statistik total, belum selesai, dan selesai + progress bar.
- Manajemen tugas: tambah, edit, hapus, cari, filter, tandai selesai.
- Penyimpanan data lokal browser (`localStorage`) tanpa server.
- Layout responsif desktop dan mobile.
- Kustomisasi Material UI: warna ungu, aksen hijau, tipografi, Button, Card, TextField.

## Dokumentasi tugas

Ambil tangkapan layar halaman Dashboard dan Daftar Tugas, termasuk versi mobile (DevTools > Toggle Device Toolbar), lalu tempel di lembar kerja dosen. Isi nama dan NIM sendiri. Rubrik dosen dibiarkan kosong. Ekspor sebagai `NIM_Nama_PAW_TugasMandiri03.pdf`.

## Catatan

Data contoh awal digunakan hanya untuk demonstrasi dan dapat diubah melalui aplikasi. Data disimpan hanya di browser pengguna.
