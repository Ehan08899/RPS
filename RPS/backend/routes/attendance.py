from flask import Blueprint, request, jsonify
from models.attendance import Attendance
from utils.database import db

attendance_bp = Blueprint('attendance', __name__)

@attendance_bp.route('/api/attendance', methods=['GET'])
def get_attendance():
    month = request.args.get('month')
    attendances = Attendance.query.all()
    return jsonify([a.to_dict() for a in attendances])

@attendance_bp.route('/api/attendance', methods=['POST'])
def update_attendance():
    data = request.json
    
    # Check if attendance exists
    attendance = Attendance.query.filter_by(
        anggota_id=data['anggota_id'],
        acara_id=data['acara_id']
    ).first()
    
    if attendance:
        attendance.status = data['status']
    else:
        attendance = Attendance(
            anggota_id=data['anggota_id'],
            acara_id=data['acara_id'],
            status=data['status']
        )
        db.session.add(attendance)
    
    db.session.commit()
    return jsonify(attendance.to_dict())