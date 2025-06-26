from dotenv import load_dotenv
from app.models import db, VirtualAccount
from app import create_app

load_dotenv()

app = create_app()

accounts_data = [
    {"name": "Mpesa_KES_1", "currency": "KES", "balance": 50000},
    {"name": "Mpesa_KES_2", "currency": "KES", "balance": 75000},
    {"name": "Bank_KES_1", "currency": "KES", "balance": 120000},
    {"name": "Bank_USD_1", "currency": "USD", "balance": 10000},
    {"name": "Bank_USD_2", "currency": "USD", "balance": 15000},
    {"name": "Bank_USD_3", "currency": "USD", "balance": 20000},
    {"name": "Wallet_NGN_1", "currency": "NGN", "balance": 4000000},
    {"name": "Wallet_NGN_2", "currency": "NGN", "balance": 2500000},
    {"name": "Bank_NGN_1", "currency": "NGN", "balance": 3000000},
    {"name": "Mpesa_NGN_1", "currency": "NGN", "balance": 1800000},
]

with app.app_context():
    for acc in accounts_data:
        existing = VirtualAccount.query.filter_by(name=acc["name"]).first()
        if not existing:
            new_account = VirtualAccount(**acc)
            db.session.add(new_account)
    db.session.commit()
    print("✅ Seeded virtual accounts successfully.")
