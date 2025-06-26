from . import db
from datetime import datetime

class VirtualAccount(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    currency = db.Column(db.String(3), nullable=False)
    balance = db.Column(db.Float, nullable=False)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source_account = db.Column(db.String(100), nullable=False)
    target_account = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), nullable=False)
    note = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<VirtualAccount {self.name} - {self.currency}: {self.balance}>"
