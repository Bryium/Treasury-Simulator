from flask import Blueprint, request, jsonify
from .models import VirtualAccount, Transaction
from . import db
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from .utils import convert_currency  # Fixed import for package-relative

treasury = Blueprint('treasury', __name__)

# ✅ Get all accounts
@treasury.route('/accounts', methods=['GET'])
def get_accounts():
    try:
        accounts = VirtualAccount.query.all()
        return jsonify([
            {
                'id': acc.id,
                'name': acc.name,
                'currency': acc.currency,
                'balance': round(acc.balance, 2)
            } for acc in accounts
        ])
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error', 'details': str(e)}), 500


# ✅ Transfer funds (with FX support)
@treasury.route('/transfer', methods=['POST'])
def transfer():
    data = request.get_json()

    source_name = data.get('source')
    target_name = data.get('target')
    amount = data.get('amount')
    note = data.get('note', '')

    if not all([source_name, target_name, amount]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        amount = float(amount)
        if amount <= 0:
            return jsonify({"error": "Amount must be greater than 0"}), 400
    except ValueError:
        return jsonify({"error": "Amount must be a number"}), 400

    source = VirtualAccount.query.filter_by(name=source_name).first()
    target = VirtualAccount.query.filter_by(name=target_name).first()

    if not source or not target:
        return jsonify({"error": "Invalid source or target account"}), 404

    if source.balance < amount:
        return jsonify({"error": "Insufficient balance in source account"}), 400

    try:
        converted_amount = convert_currency(amount, source.currency, target.currency)

        # Update balances
        source.balance -= amount
        target.balance += converted_amount

        # Log transaction (keep original and converted info)
        txn = Transaction(
            source_account=source.name,
            target_account=target.name,
            amount=amount,
            currency=source.currency,
            note=note,
            timestamp=datetime.utcnow()
        )

        db.session.add(txn)
        db.session.commit()

        return jsonify({
            "message": "Transfer successful",
            "converted_amount": round(converted_amount, 2),
            "from_currency": source.currency,
            "to_currency": target.currency
        }), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Transaction failed", "details": str(e)}), 500

    except ValueError as e:
        return jsonify({"error": str(e)}), 400


# ✅ Get filtered transactions (account and currency)
@treasury.route('/transactions', methods=['GET'])
def get_transactions():
    account = request.args.get('account')
    currency = request.args.get('currency')

    try:
        query = Transaction.query

        if account:
            query = query.filter(
                (Transaction.source_account == account) |
                (Transaction.target_account == account)
            )
        if currency:
            query = query.filter_by(currency=currency)

        txns = query.order_by(Transaction.timestamp.desc()).all()

        return jsonify([
            {
                'id': t.id,
                'source': t.source_account,
                'target': t.target_account,
                'amount': round(t.amount, 2),
                'currency': t.currency,
                'note': t.note,
                'timestamp': t.timestamp.strftime("%Y-%m-%d %H:%M:%S")
            } for t in txns
        ])
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
