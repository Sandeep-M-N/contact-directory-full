from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    contacts = db.relationship('Contact', backref='owner', lazy=True)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    group_name = db.Column(db.String(80), nullable=True)  # Changed from group_id to group_name
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
