from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from utils.database import db

class Attendance(db.Model):
    __tablename__ = 'absensi'
    
    id = Column(Integer, primary_key=True)
    anggota_id = Column(Integer, ForeignKey('anggota.id'), nullable=False)
    acara_id = Column(Integer, ForeignKey('acara.id'), nullable=False)
    status = Column(String(20), nullable=False)  # Hadir/Izin/Alfa
    
    # Relationships
    member = relationship('Member', backref='attendances')
    event = relationship('Event', backref='attendances')
    
    def to_dict(self):
        return {
            'id': self.id,
            'anggota_id': self.anggota_id,
            'acara_id': self.acara_id,
            'status': self.status
        }