# Planning: Setup Project Backend (Bun + ElysiaJS + Drizzle + MySQL)

Dokumen ini adalah issue/planning untuk melakukan setup awal project backend. Silakan ikuti instruksi high-level di bawah ini untuk mengimplementasikannya.

## 1. Inisialisasi Project
*   Inisialisasi sebuah project web menggunakan **Bun** di direktori ini.
*   Pastikan file konfigurasi dasar seperti `package.json` dan `tsconfig.json` sudah dibuat.

## 2. Instalasi Dependencies
*   Tambahkan dependencies utama yang dibutuhkan:
    *   **ElysiaJS** sebagai framework backend.
    *   **Drizzle ORM** sebagai ORM.
    *   **Drizzle Kit** (sebagai dev dependency) untuk manajemen migrasi.
    *   Driver database **MySQL** yang kompatibel dengan Bun/Drizzle (misalnya `mysql2`).

## 3. Konfigurasi Database
*   Siapkan folder/file khusus untuk database (misalnya di dalam `src/db`).
*   Buat file skema Drizzle (schema) dan definisikan setidaknya satu tabel contoh, seperti tabel `users`.
*   Buat file koneksi database yang menginisialisasi Drizzle ORM dengan driver MySQL, menggunakan *connection string* dari environment variable (`.env`).
*   Buat file `drizzle.config.ts` di root project untuk mengatur konfigurasi skema dan output migrasi Drizzle.
*   Tambahkan command scripts di `package.json` untuk mempermudah proses migrasi (misalnya script untuk `generate` dan `migrate/push`).

## 4. Setup Server Aplikasi
*   Buat entry point server Elysia (misalnya `src/index.ts`).
*   Jalankan server Elysia pada port yang ditentukan.
*   Buat beberapa endpoint dasar:
    *   Health check endpoint (`GET /`) untuk memastikan server up.
    *   Buat integrasi route yang menggunakan koneksi Drizzle database untuk melakukan operasi dasar (misal read atau insert ke tabel contoh).

## 5. Merapikan Struktur & Konfigurasi Ekstra
*   Pisahkan routing/controller dari logic database agar modular.
*   Pastikan ada script npm/bun untuk menjalankan server dalam mode development dengan fitur *hot-reload*.
*   Buat file `.env.example` sebagai template berisi proxy koneksi database MySQL.

---
**Catatan untuk Implementor:**
Tujuan utama dari task ini hanya menyediakan *boilerplate* dasar yang bersih (*clean*) dan dapat berjalan tanpa error. Detail business logic yang kompleks belum perlu dibuat.
