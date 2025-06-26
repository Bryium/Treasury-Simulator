from flask import Blueprint, request, jsonify
from .models import Account, Transaction
from . import db
from .utils import convert_currency


treasury = Blueprint('treasury', __name__)

@treasury.route('/accounts', methods=['GET'])
def get_accounts():
    accounts = Account.query.all()
    return jsonify([
        {
            'id': acc.id,
            'name': acc.name,
            'currency': acc.currency,
            'balance': round(acc.balance, 2)
        } for acc in accounts
    ])

@treasury.route('/transfer', methods=['POST'])
def transfer():
    data = request.json
    source_name = data.get('source')
    target_name = data.get('target')
    amount = float(data.get('amount'))
    note = data.get('note', '')

    source = Account.query.filter_by(name=source_name).first()
    target = Account.query.filter_by(name=target_name).first()

    if not source or not target:
        return jsonify({"error": "Invalid source or target account"}), 400

    converted_amount = convert_currency(amount, source.currency, target.currency)

    if source.balance < amount:
        return jsonify({"error": "Insufficient balance"}), 400

    source.balance -= amount
    target.balance += converted_amount

    txn = Transaction(
        source_account=source.name,
        target_account=target.name,
        amount=amount,
        currency=source.currency,
        note=note
    )

    db.session.add(txn)
    db.session.commit()

    return jsonify({"message": "Transfer successful"})

@treasury.route('/transactions', methods=['GET'])
def get_transactions():
    account = request.args.get('account')
    currency = request.args.get('currency')

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
            'amount': t.amount,
            'currency': t.currency,
            'note': t.note,
            'timestamp': t.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        } for t in txns
    ])