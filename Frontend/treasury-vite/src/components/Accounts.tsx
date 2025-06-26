// src/components/Accounts.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";

interface Account {
  id: number;
  name: string;
  currency: string;
  balance: number;
}

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    api
      .get("/accounts")
      .then((res) => setAccounts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white p-4 rounded shadow">
            <p>
              <strong>Name:</strong> {account.name}
            </p>
            <p>
              <strong>Currency:</strong> {account.currency}
            </p>
            <p>
              <strong>Balance:</strong> {account.balance}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
