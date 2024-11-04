from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Contact
from config import Config
api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = generate_password_hash(data['password'])
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token,username=user.username)
        
    return jsonify({"message": "Bad username or password"}), 401

@api.route('/contacts', methods=['GET', 'POST'])
@jwt_required()
def contacts():
    user_id = get_jwt_identity()
    if request.method == 'GET':
        contacts = Contact.query.filter_by(user_id=user_id).all()
        return jsonify([{"id": c.id, "name": c.name, "email": c.email, "phone": c.phone, "group_name": c.group_name} for c in contacts])

    if request.method == 'POST':
        data = request.json
        new_contact = Contact(name=data['name'], email=data['email'], phone=data['phone'], group_name=data.get('group_name'), user_id=user_id)
        db.session.add(new_contact)
        db.session.commit()
        return jsonify({"message": "Contact added"}), 201

@api.route('/contacts/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def contact(id):
    user_id = get_jwt_identity()
    contact = Contact.query.get(id)

    if request.method == 'PUT':
        data = request.json
        contact.name = data['name']
        contact.email = data['email']
        contact.phone = data['phone']
        contact.group_name = data.get('group_name')  # Updated field name
        db.session.commit()
        return jsonify({"message": "Contact updated"})

    if request.method == 'DELETE':
        db.session.delete(contact)
        db.session.commit()
        return jsonify({"message": "Contact deleted"})
    
@api.route('/groups', methods=['GET'])
@jwt_required()
def get_groups():
    try:
        # Query distinct group names
        user_id = get_jwt_identity()
        groups = db.session.query(Contact.group_name).distinct().all()
        group_list = [group[0] for group in groups if group[0] is not None]  # Extract group names and filter out None
        return jsonify(group_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
