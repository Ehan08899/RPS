-- Create database
CREATE DATABASE IF NOT EXISTS motorcycle_club;

-- Connect to database
\c motorcycle_club;

-- Create table anggota
CREATE TABLE IF NOT EXISTS anggota (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    umur INTEGER NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jabatan VARCHAR(20) NOT NULL CHECK (jabatan IN ('Prospect', 'Anggota', 'Eksekutif')),
    aktif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table acara
CREATE TABLE IF NOT EXISTS acara (
    id SERIAL PRIMARY KEY,
    tanggal_acara DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table absensi
CREATE TABLE IF NOT EXISTS absensi (
    id SERIAL PRIMARY KEY,
    anggota_id INTEGER NOT NULL REFERENCES anggota(id) ON DELETE CASCADE,
    acara_id INTEGER NOT NULL REFERENCES acara(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Hadir', 'Izin', 'Alfa')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(anggota_id, acara_id)
);

-- Create indexes for better performance
CREATE INDEX idx_anggota_jabatan ON anggota(jabatan);
CREATE INDEX idx_anggota_aktif ON anggota(aktif);
CREATE INDEX idx_acara_tanggal ON acara(tanggal_acara);
CREATE INDEX idx_absensi_anggota ON absensi(anggota_id);
CREATE INDEX idx_absensi_acara ON absensi(acara_id);

-- Insert sample data (optional)
INSERT INTO anggota (nama, umur, tanggal_lahir, jabatan) VALUES
    ('Abim', 25, '1999-05-15', 'Prospect'),
    ('Acim', 27, '1997-08-20', 'Anggota'),
    ('Akil', 30, '1994-03-10', 'Eksekutif'),
    ('Apuy', 24, '2000-11-05', 'Prospect');

INSERT INTO acara (tanggal_acara) VALUES
    ('2025-08-24'),
    ('2025-09-20'),
    ('2025-09-09');

-- Sample attendance data
INSERT INTO absensi (anggota_id, acara_id, status) VALUES
    (1, 1, 'Alfa'),
    (1, 2, 'Alfa'),
    (2, 1, 'Hadir'),
    (2, 2, 'Hadir'),
    (3, 1, 'Hadir'),
    (3, 2, 'Hadir'),
    (4, 1, 'Alfa'),
    (4, 2, 'Alfa');