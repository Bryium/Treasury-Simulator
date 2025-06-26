export const fetchAccounts = async () =>
  fetch("http://localhost:5000/api/accounts").then((res) => res.json());

export const fetchTransactions = async () =>
  fetch("http://localhost:5000/api/transactions").then((res) => res.json());

export const postTransfer = async (data: any) => {
  return fetch("http://localhost:5000/api/transfer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
