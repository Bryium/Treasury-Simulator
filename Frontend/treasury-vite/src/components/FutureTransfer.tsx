import { useState } from "react";
import { toast } from "react-toastify";

export default function FutureTransfer() {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const accounts = [
    "Mpesa_KES_1",
    "Bank_KES_2",
    "Bank_USD_3",
    "Mpesa_USD_4",
    "Wallet_KES_5",
  ];

  const simulate = () => {
    if (!fromAccount || !toAccount || !date || !description) {
      toast.error("Please fill all fields.");
      return;
    }

    if (fromAccount === toAccount) {
      toast.warn("From and To accounts should not be the same.");
      return;
    }

    toast.success(
      `Transfer from ${fromAccount} to ${toAccount} scheduled for ${date} with note: "${description}"`
    );

    // Reset form (optional)
    setFromAccount("");
    setToAccount("");
    setDate("");
    setDescription("");
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">
        Simulate Future Transfer
      </h2>

      <div className="mb-2">
        <label className="block mb-1 font-medium">From Account</label>
        <select
          className="w-full p-2 border rounded"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
        >
          <option value="">Select Account</option>
          {accounts.map((acc) => (
            <option key={acc} value={acc}>
              {acc}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-medium">To Account</label>
        <select
          className="w-full p-2 border rounded"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
        >
          <option value="">Select Account</option>
          {accounts.map((acc) => (
            <option key={acc} value={acc}>
              {acc}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-medium">Transfer Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="e.g. Rent payment"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700"
        onClick={simulate}
      >
        Simulate Transfer
      </button>
    </div>
  );
}
