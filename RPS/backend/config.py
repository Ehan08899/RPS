import os
from dotenv import load_dotenv

# Muat isi file .env
load_dotenv()

class Config:
    # Secret key untuk keamanan Flask
    SECRET_KEY = os.getenv("SECRET_KEY")

    # Koneksi ke database Neon (dari .env)
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

    # Nonaktifkan fitur tracking (hemat performa)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
