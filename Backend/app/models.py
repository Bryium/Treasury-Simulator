from . import db
from datetime import datetime

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    currency = db.Column(db.String(10), nullable=False)
    balance = db.Column(db.Float, nullable=False, default=0.0)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source_account = db.Column(db.String(100), nullable=False)
    target_account = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), nullable=False)
    note = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)