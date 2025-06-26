import React, { useState } from "react";
import { postTransfer } from "../api";

type Account = {
  id: number;
  name: string;
  currency: string;
  balance: number;
};

export const TransferForm = ({
  accounts,
  onTransfer,
}: {
  accounts: Account[];
  onTransfer: () => void;
}) => {
  const [sourceId, setSourceId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceId || !destinationId || amount <= 0) {
      alert("All fields are required.");
      return;
    }
    if (sourceId === destinationId) {
      alert("Source and destination accounts must be different.");
      return;
    }

    try {
      await postTransfer({
        source_id: Number(sourceId),
        destination_id: Number(destinationId),
        amount,
        note,
      });

      // Reset form
      setSourceId("");
      setDestinationId("");
      setAmount(0);
      setNote("");
      onTransfer();
    } catch (error) {
      console.error("Transfer failed", error);
      alert("Transfer failed. Check balances or server connection.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white p-6 shadow rounded"
    >
      <div>
        <label className="block mb-1 font-medium">Source Account</label>
        <select
          value={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Source</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({acc.currency})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Destination Account</label>
        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Destination</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({acc.currency})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className="w-full border px-3 py-2 rounded"
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Note (optional)</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Transfer
      </button>
    </form>
  );
};
