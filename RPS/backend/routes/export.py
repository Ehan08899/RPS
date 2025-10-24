from flask import Blueprint, request, send_file
from models.member import Member
from models.event import Event
from models.attendance import Attendance
from utils.export_helper import generate_excel_report
from datetime import datetime
from utils.database import db

export_bp = Blueprint('export', __name__)

@export_bp.route('/api/export/excel', methods=['GET'])
def export_excel():
    month = request.args.get('month')  # Format: YYYY-MM
    jabatan = request.args.get('jabatan', 'ALL')
    
    # Get filtered data
    year, month_num = map(int, month.split('-'))
    
    # Get members
    members_query = Member.query
    if jabatan != 'ALL':
        members_query = members_query.filter_by(jabatan=jabatan)
    members = members_query.all()
    
    # Get events
    events = Event.query.filter(
        db.extract('year', Event.tanggal_acara) == year,
        db.extract('month', Event.tanggal_acara) == month_num
    ).order_by(Event.tanggal_acara).all()
    
    # Get attendance
    event_ids = [e.id for e in events]
    attendances = Attendance.query.filter(
        Attendance.acara_id.in_(event_ids)
    ).all()
    
    # Generate Excel
    filepath = generate_excel_report(members, events, attendances, month)
    
    return send_file(
        filepath,
        as_attachment=True,
        download_name=f'Absensi_RipperSpear_{month}.xls'
    )