from flask import Blueprint, request, jsonify
from models.event import Event
from utils.database import db
from datetime import datetime

events_bp = Blueprint('events', __name__)

@events_bp.route('/api/events', methods=['GET'])
def get_events():
    month = request.args.get('month')  # Format: YYYY-MM
    query = Event.query
    
    if month:
        year, month_num = map(int, month.split('-'))
        query = query.filter(
            db.extract('year', Event.tanggal_acara) == year,
            db.extract('month', Event.tanggal_acara) == month_num
        )
    
    events = query.order_by(Event.tanggal_acara).all()
    return jsonify([e.to_dict() for e in events])

@events_bp.route('/api/events', methods=['POST'])
def create_event():
    data = request.json
    event = Event(
        tanggal_acara=datetime.strptime(data['tanggal_acara'], '%Y-%m-%d').date()
    )
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_dict()), 201

@events_bp.route('/api/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return '', 204