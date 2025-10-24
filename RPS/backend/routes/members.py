from flask import Blueprint, request, jsonify
from models.member import Member
from utils.database import db
from datetime import datetime

members_bp = Blueprint('members', __name__)

@members_bp.route('/api/members', methods=['GET'])
def get_members():
    members = Member.query.all()
    return jsonify([m.to_dict() for m in members])

@members_bp.route('/api/members', methods=['POST'])
def create_member():
    data = request.json
    member = Member(
        nama=data['nama'],
        umur=data['umur'],
        tanggal_lahir=datetime.strptime(data['tanggal_lahir'], '%Y-%m-%d').date(),
        jabatan=data['jabatan'],
        aktif=True
    )
    db.session.add(member)
    db.session.commit()
    return jsonify(member.to_dict()), 201

@members_bp.route('/api/members/<int:id>', methods=['PUT'])
def update_member(id):
    member = Member.query.get_or_404(id)
    data = request.json
    
    member.nama = data.get('nama', member.nama)
    member.umur = data.get('umur', member.umur)
    if 'tanggal_lahir' in data:
        member.tanggal_lahir = datetime.strptime(data['tanggal_lahir'], '%Y-%m-%d').date()
    member.jabatan = data.get('jabatan', member.jabatan)
    member.aktif = data.get('aktif', member.aktif)
    
    db.session.commit()
    return jsonify(member.to_dict())

@members_bp.route('/api/members/<int:id>', methods=['DELETE'])
def delete_member(id):
    member = Member.query.get_or_404(id)
    db.session.delete(member)
    db.session.commit()
    return '', 204