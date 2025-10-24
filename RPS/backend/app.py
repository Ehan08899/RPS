from flask import Flask
from flask_cors import CORS
from config import Config
from utils.database import init_db
from routes.members import members_bp
from routes.events import events_bp
from routes.attendance import attendance_bp
from routes.export import export_bp

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app)

# Initialize database
init_db(app)

# Register blueprints
app.register_blueprint(members_bp)
app.register_blueprint(events_bp)
app.register_blueprint(attendance_bp)
app.register_blueprint(export_bp)

@app.route('/')
def index():
    return {'message': 'Motorcycle Club Attendance API'}

if __name__ == '__main__':
    app.run(debug=True, port=5000)