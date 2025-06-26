const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchAccounts = async () =>
  fetch(`${BASE_URL}/api/accounts`).then((res) => res.json());

export const fetchTransactions = async () =>
  fetch(`${BASE_URL}/api/transactions`).then((res) => res.json());

export const postTransfer = async (data: any) => {
  return fetch(`${BASE_URL}/api/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
