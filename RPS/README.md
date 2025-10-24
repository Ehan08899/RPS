# Aplikasi Absensi Club Motor RipperSpear

Aplikasi web untuk mengelola absensi club motor dengan fitur lengkap: CRUD anggota, CRUD acara, tracking absensi bulanan, dan export ke Excel.

## 🚀 Teknologi

**Backend:**
- Python 3.9+
- Flask
- PostgreSQL
- SQLAlchemy

**Frontend:**
- React 18
- Tailwind CSS
- Axios

## 📋 Prasyarat

- Python 3.9 atau lebih tinggi
- Node.js 16+ dan npm
- PostgreSQL 12+

## 🛠️ Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd motorcycle-club-attendance
```

### 2. Setup Database
```bash
# Login ke PostgreSQL
psql -U postgres

# Jalankan script init
\i database/init.sql

# Atau manual:
CREATE DATABASE motorcycle_club;
```

### 3. Setup Backend
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "DATABASE_URL=postgresql://username:password@localhost:5432/motorcycle_club" > .env
echo "SECRET_KEY=your-secret-key-here" >> .env

# Run backend
python app.py
```

Backend akan berjalan di `http://localhost:5000`

### 4. Setup Frontend
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Run frontend
npm start
```

Frontend akan berjalan di `http://localhost:3000`

## 📁 Struktur Database

### Table: anggota
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | SERIAL | Primary key |
| nama | VARCHAR(100) | Nama anggota |
| umur | INTEGER | Umur |
| tanggal_lahir | DATE | Tanggal lahir |
| jabatan | VARCHAR(20) | Prospect/Anggota/Eksekutif |
| aktif | BOOLEAN | Status ON/OFF |

### Table: acara
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | SERIAL | Primary key |
| tanggal_acara | DATE | Tanggal acara formal |

### Table: absensi
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | SERIAL | Primary key |
| anggota_id | INTEGER | FK ke anggota |
| acara_id | INTEGER | FK ke acara |
| status | VARCHAR(20) | Hadir/Izin/Alfa |

## 🎯 Fitur

✅ **Manajemen Anggota**
- Tambah/Edit/Hapus anggota
- Toggle status ON/OFF
- Filter berdasarkan jabatan

✅ **Manajemen Acara**
- Tambah acara formal
- Hapus acara
- Otomatis grouping per bulan

✅ **Tracking Absensi**
- Update status (Hadir/Izin/Alfa) dengan 1 klik
- Akumulasi otomatis per anggota
- Total per acara

✅ **Export Excel**
- Format sesuai template RipperSpear
- Filter per bulan dan jabatan
- Tanggal export otomatis

## 🖥️ API Endpoints

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Events
- `GET /api/events?month=YYYY-MM` - Get events by month
- `POST /api/events` - Create event
- `DELETE /api/events/:id` - Delete event

### Attendance
- `GET /api/attendance?month=YYYY-MM` - Get attendance
- `POST /api/attendance` - Update attendance

### Export
- `GET /api/export/excel?month=YYYY-MM&jabatan=ALL` - Export Excel

## 📸 Screenshot

Tampilan aplikasi akan menampilkan:
- Grid Excel-like dengan warna status (Hijau=Hadir, Kuning=Izin, Merah=Alfa)
- Filter bulan dan jabatan
- Button ON/OFF untuk status anggota
- Akumulasi total per anggota dan per acara
- Export ke Excel dengan format RipperSpear

## 🔧 Troubleshooting

**Backend tidak bisa connect ke database:**
```bash
# Check PostgreSQL service
sudo service postgresql status

# Check connection string di .env
DATABASE_URL=postgresql://username:password@localhost:5432/motorcycle_club
```

**CORS Error:**
```bash
# Pastikan Flask-CORS sudah diinstall
pip install Flask-CORS
```

**Frontend tidak bisa fetch data:**
```bash
# Check .env di frontend
REACT_APP_API_URL=http://localhost:5000/api

# Restart frontend
npm start
```

## 👥 Developer

- **Koordinator Prospect:** Akil
- **Keanggotaan/Komisi Disiplin RPS:** Ehan & Ica
- **Ketua & Wakil RPS:** Eman & Adam

## 📄 License

MIT License

---

**"STRUGGLE TOGETHER"** 🏍️