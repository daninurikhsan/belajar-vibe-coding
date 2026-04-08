# Implementasi Fitur Registrasi User

Dokumen ini berisi perencanaan (issue) untuk mengimplementasikan fitur pembuatan user (registrasi) baru. Silakan baca dan ikuti langkah-langkah di bawah ini secara berurutan.

## 1. Pembaruan Skema Database (Tabel Users)
Ubah file skema Drizzle ORM (biasanya di `src/db/schema.ts`) agar tabel `users` memiliki kolom-kolom berikut:
- `id`: integer, auto increment, sebagai primary key.
- `name`: varchar(255), tidak boleh kosong (not null).
- `email`: varchar(255), tidak boleh kosong (not null), dan harus unique.
- `password`: varchar(255), tidak boleh kosong (not null). (Kolom ini ditujukan untuk meyimpan hash password).
- `created_at`: timestamp, nilai default-nya adalah waktu saat baris ini dibuat (`now()`).
- `updated_at`: timestamp, nilai default-nya adalah waktu saat baris ini dibuat (`now()`), atau ter-update saat ada pembaruan data.

*(Catatan: Setelah memperbarui skema ini, jangan lupa untuk membuat dan menjalankan migrasi ke database).*

## 2. Pengaturan Struktur Folder
Kita perlu membuat kode lebih modular. Di dalam direktori `src`, buatlah struktur folder berikut:
- `src/routes/`: Folder ini dikhususkan untuk menyimpan deklarasi endpoint routing dari framework ElysiaJS.
- `src/services/`: Folder ini dikhususkan untuk menyimpan atau mengeksekusi logik bisnis (business logic) aplikasi, termasuk interaksi ke database.

## 3. Implementasi Logic (ServiceLayer)
Buat file logic di dalam folder services (misalnya `src/services/userService.ts`). Tugas service ini adalah:
1. Menerima payload dari user berupa `name`, `email`, dan `password`.
2. Melakukan proses hashing pada `password`. Anda dapat menggunakan library seperti `bcrypt`, `bcryptjs`, atau bawaan hashing native dari `Bun.password`.
3. Menyimpan/insert data pendaftar baru tersebut ke dalam tabel `users`.
4. Mengembalikan data user yang berhasil disimpan, namun **Wajib menghilangkan (exclude) kolom password** demi keamanan.

## 4. Implementasi Endpoint API (Route Layer)
Buat file route di dalam folder routes (misalnya `src/routes/userRoute.ts`). 
- **Method & Endpoint**: `POST /api/users`
- **Request Body (JSON)**:
  - `name` (string, wajib)
  - `email` (string, wajib, format email valid)
  - `password` (string, wajib)
- **Response Body - Sukses (JSON)**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
  ```
- **Response Body - Error (JSON)**:
  Jika input tidak lengkap atau email sudah digunakan, maka kembalikan respons error:
  ```json
  {
    "error": "Penjelasan pesan error (contoh: Email sudah terdaftar atau input tidak valid)"
  }
  ```

*Tugas pada route:*
Lakukan validasi skema input body (disarankan menggunakan validasi type dari ElysiaJS `t.Object`), lalu teruskan payload tervalidasi ke fungsi service layer. Tangkap response dari validasi/service, kemudian kembalikan respons HTTP yang sesuai.

## 5. Integrasi ke Entry Point Server
Buka file `src/index.ts` dan import routing yang sudah dibuat dari `src/routes/userRoute.ts`. Pasang (register) route tersebut ke instance Elysia utama agar URL `/api/users` bisa diakses melalui web server.
