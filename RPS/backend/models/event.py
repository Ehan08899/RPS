from sqlalchemy import Column, Integer, Date
from utils.database import db

class Event(db.Model):
    __tablename__ = 'acara'
    
    id = Column(Integer, primary_key=True)
    tanggal_acara = Column(Date, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'tanggal_acara': str(self.tanggal_acara)
        }