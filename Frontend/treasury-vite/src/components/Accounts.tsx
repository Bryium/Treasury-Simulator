import React from "react";

type Account = {
  id: number;
  name: string;
  currency: string;
  balance: number;
};

export const Accounts = ({ accounts }: { accounts: Account[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {accounts.map((acc) => (
        <div key={acc.id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-bold">{acc.name}</h2>
          <p>{acc.currency}</p>
          <p className="font-semibold">Balance: {acc.balance.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};
