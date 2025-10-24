import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'postgresql://postgres:hanslowjr08@localhost:5432/motorcycle'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False