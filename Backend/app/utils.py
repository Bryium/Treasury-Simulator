exchange_rates = {
    "KES": {
        "USD": 1 / 129.04,
        "NGN": 11.92
    },
    "USD": {
        "KES": 129.04,
        "NGN": 1543.74
    },
    "NGN": {
        "USD": 1 / 1543.74,
        "KES": 1 / 11.92
    }
}

def convert_currency(amount, from_currency, to_currency):
    if from_currency == to_currency:
        return amount
    try:
        rate = exchange_rates[from_currency][to_currency]
        return amount * rate
    except KeyError:
        raise ValueError("Unsupported currency conversion")