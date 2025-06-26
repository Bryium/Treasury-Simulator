fx_rates = {
    ("USD", "KES"): 140.0,
    ("KES", "USD"): 1 / 140.0,
    ("USD", "NGN"): 1500.0,
    ("NGN", "USD"): 1 / 1500.0,
    ("KES", "NGN"): 10.5,
    ("NGN", "KES"): 1 / 10.5,
}

def convert_currency(amount, from_currency, to_currency):
    if from_currency == to_currency:
        return amount
    return amount * fx_rates.get((from_currency, to_currency), 1)