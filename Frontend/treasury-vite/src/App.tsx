import React, { useEffect, useState } from "react";
import { fetchAccounts, fetchTransactions } from "./api";
import { Accounts } from "./components/Accounts";
import { TransferForm } from "./components/TransferForm";
import { LogsTable } from "./components/LogsTable";

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [logs, setLogs] = useState([]);

  const load = async () => {
    const acc = await fetchAccounts();
    const tr = await fetchTransactions();
    setAccounts(acc);
    setLogs(tr);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Treasury Simulator</h1>
      <Accounts accounts={accounts} />
      <TransferForm accounts={accounts} onTransfer={load} />
      <LogsTable logs={logs} />
    </div>
  );
};

export default App;
