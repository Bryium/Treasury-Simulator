import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TransferLogs() {
  const [logs, setLogs] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [accountFilter, setAccountFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");

  useEffect(() => {
    api.get("/accounts").then((res) => setAccounts(res.data));
    fetchLogs();
  }, []);

  const fetchLogs = () => {
    api
      .get("/transactions", {
        params: {
          account: accountFilter || undefined,
          currency: currencyFilter || undefined,
        },
      })
      .then((res) => setLogs(res.data));
  };

  useEffect(() => {
    fetchLogs();
  }, [accountFilter, currencyFilter]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transfer Logs</h2>

      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) => setAccountFilter(e.target.value)}
          className="p-2"
        >
          <option value="">All Accounts</option>
          {accounts.map((a: any) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setCurrencyFilter(e.target.value)}
          className="p-2"
        >
          <option value="">All Currencies</option>
          <option value="KES">KES</option>
          <option value="USD">USD</option>
          <option value="NGN">NGN</option>
        </select>
      </div>

      <ul className="space-y-2">
        {logs.map((log: any) => (
          <li key={log.id} className="bg-white p-3 rounded shadow">
            <p>
              <strong>From:</strong> {log.source} → <strong>To:</strong>{" "}
              {log.target}
            </p>
            <p>
              <strong>Amount:</strong> {log.amount} {log.currency}
            </p>
            {log.note && (
              <p>
                <strong>Note:</strong> {log.note}
              </p>
            )}
            <p>
              <strong>Date:</strong> {new Date(log.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
