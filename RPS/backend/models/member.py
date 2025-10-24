from sqlalchemy import Column, Integer, String, Date, Boolean
from utils.database import db

class Member(db.Model):
    __tablename__ = 'anggota'
    
    id = Column(Integer, primary_key=True)
    nama = Column(String(100), nullable=False)
    umur = Column(Integer, nullable=False)
    tanggal_lahir = Column(Date, nullable=False)
    jabatan = Column(String(20), nullable=False)  # Prospect/Anggota/Eksekutif
    aktif = Column(Boolean, default=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nama': self.nama,
            'umur': self.umur,
            'tanggal_lahir': str(self.tanggal_lahir),
            'jabatan': self.jabatan,
            'aktif': self.aktif
        }