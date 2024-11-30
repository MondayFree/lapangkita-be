## Cara Install & Setup 🔧

### 1. Clone Repository dan Install Dependencies

```bash
# Clone repo ini
git clone <url-repo-ini>

# Masuk ke folder project
cd project_name

# Install dependencies yang dibutuhin
npm install
```

### 2. Setup Environment Variables

Bikin file `.env` di root folder project. Bisa copy dari `.env.example` terus sesuaiin isinya:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/lapangkita
JWT_SECRET=rahasia_jwt_kamu  # Ganti dengan secret key yang aman
JWT_EXPIRES_IN=24h  # Token expired dalam 24 jam
```

Tips buat `JWT_SECRET`:
- Jangan pake yang gampang ditebak
- Minimal 32 karakter
- Bisa pake random string generator

### 3. Jalanin Database Seeder

(Disarankan) Kalo mau punya data awal buat testing, bisa jalanin seeder:

```bash
npm run seed
```

Ini bakal bikin:
- 2 user
- Dengan password default: `123asd` untuk CUSTOMER dan `admin#123` untuk ADMIN

### 4. Jalanin Aplikasi

```bash
# Mode development (pake nodemon)
npm run dev

# Mode production
npm start
```

## Cara Pake Swagger UI 📚

1. Buka browser, ketik: `http://localhost:8080/docs`

2. Cara Authentication di Swagger:
   - Login dulu pake endpoint `/api/users/login`
   - Copy token dari response
   - Klik tombol "Authorize" (🔓) di bagian atas
   - Tulis: `<token>` yang kamu dapat dari login, di field `value` (kalo di swagger udah otomatis ditambahin `Bearer` utk prefix tokennya, kalo pake postman butuh ditambah manual)
   - Klik "Authorize"
   - Sekarang bisa akses endpoint yang butuh auth! 🎉

### Contoh Request di Swagger

#### Login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```


## Tips Penggunaan 💡

1. **Testing API:**
   - Bisa pake Swagger UI (recommended buat yang baru mulai)
   - Bisa juga pake Postman
   - Jangan lupa selalu pake token di header: `Authorization: Bearer <token>`

2. **Troubleshooting:**
   - Kalau ada error "Unauthorized", cek tokennya:
     - Udah pake format "Bearer" belum?
     - Token masih valid ga? (expired setelah 24 jam)
     - Token udah bener belum formatnya?
   
   - Kalau MongoDB error:
     - MongoDB udah jalan belum di local?
     - URI di .env udah bener?

3. **Best Practices:**
   - Jangan share JWT_SECRET ke siapa-siapa
   - Ganti password default dari seeder
   - Test dulu di Swagger sebelum integrasi ke frontend
