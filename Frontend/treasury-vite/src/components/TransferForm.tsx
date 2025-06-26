import React, { useState } from "react";
import { postTransfer } from "../api";

type Props = {
  accounts: { id: number; name: string; currency: string; balance: number }[];
  onTransfer: () => void;
};

export const TransferForm = ({ accounts, onTransfer }: Props) => {
  const [src, setSrc] = useState(0);
  const [dst, setDst] = useState(0);
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (src === dst) return alert("Cannot transfer to same account");
    const source = accounts.find((a) => a.id === src);
    if (source && source.balance < amount) return alert("Insufficient funds");
    await postTransfer({
      src_id: src,
      dst_id: dst,
      amount,
      note,
      scheduled_date: date,
    });
    onTransfer();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select value={src} onChange={(e) => setSrc(+e.target.value)}>
        <option value={0}>Select source account</option>
        {accounts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
      <select value={dst} onChange={(e) => setDst(+e.target.value)}>
        <option value={0}>Select destination account</option>
        {accounts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Transfer
      </button>
    </form>
  );
};
