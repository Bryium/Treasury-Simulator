import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TransferFund() {
  const [accounts, setAccounts] = useState([]);
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    api.get("/accounts").then((res) => setAccounts(res.data));
  }, []);

  const handleTransfer = async () => {
    try {
      const res = await api.post("/transfer", {
        from_account: fromAccount,
        to_account: toAccount,
        amount: parseFloat(amount),
        note,
      });
      alert("Transfer Successful!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Transfer failed.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Transfer Funds</h2>
      <select
        onChange={(e) => setFromAccount(e.target.value)}
        className="w-full p-2 mb-2"
      >
        <option value="">From Account</option>
        {accounts.map((acc: any) => (
          <option key={acc.id} value={acc.name}>
            {acc.name}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setToAccount(e.target.value)}
        className="w-full p-2 mb-2"
      >
        <option value="">To Account</option>
        {accounts.map((acc: any) => (
          <option key={acc.id} value={acc.name}>
            {acc.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 mb-2 border"
      />
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional Note"
        className="w-full p-2 mb-2 border"
      />
      <button
        onClick={handleTransfer}
        className="bg-blue-500 text-white p-2 w-full rounded"
      >
        Transfer
      </button>
    </div>
  );
}
