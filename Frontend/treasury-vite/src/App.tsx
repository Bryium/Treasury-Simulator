import React, { useEffect, useState } from "react";
import { fetchAccounts, fetchTransactions } from "./api";
import { Accounts } from "./components/Accounts";
import { TransferForm } from "./components/TransferForm";
import { LogsTable } from "./components/LogsTable";

type Account = {
  id: string;
  name: string;
  currency: "KES" | "USD" | "NGN";
  balance: number;
};

type Transaction = {
  id: string;
  source: string;
  destination: string;
  amount: number;
  note?: string;
  timestamp: string;
  fx?: string;
};

const App = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [logs, setLogs] = useState<Transaction[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const load = async () => {
    const acc = await fetchAccounts();
    const tr = await fetchTransactions();
    setAccounts(acc);
    setLogs(tr);
  };

  useEffect(() => {
    load();
  }, []);

  const createAccount = (newAccount: Account) => {
    setAccounts((prev) => [...prev, newAccount]);
    setShowCreateModal(false);
  };

  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Treasury Dashboard</h2>
          <nav className="space-y-4">
            <button
              onClick={() => scrollTo("accounts")}
              className="block w-full text-left hover:underline"
            >
              Accounts
            </button>
            <button
              onClick={() => scrollTo("transfer")}
              className="block w-full text-left hover:underline"
            >
              Transfer Funds
            </button>
            <button
              onClick={() => scrollTo("logs")}
              className="block w-full text-left hover:underline"
            >
              Transaction Logs
            </button>
          </nav>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-8 bg-white text-blue-900 font-semibold px-4 py-2 rounded hover:bg-gray-200"
        >
          + Create Account
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-12 overflow-y-auto">
        <section id="accounts">
          <h2 className="text-xl font-semibold mb-4">Accounts</h2>
          <Accounts accounts={accounts} />
        </section>

        <section id="transfer">
          <h2 className="text-xl font-semibold mb-4">Transfer Funds</h2>
          <TransferForm accounts={accounts} onTransfer={load} />
        </section>

        <section id="logs">
          <h2 className="text-xl font-semibold mb-4">Transaction Logs</h2>
          <LogsTable logs={logs} />
        </section>
      </main>

      {/* Create Account Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Create New Account</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = (
                  e.currentTarget.elements.namedItem("name") as HTMLInputElement
                ).value;
                const currency = (
                  e.currentTarget.elements.namedItem(
                    "currency"
                  ) as HTMLSelectElement
                ).value as "KES" | "USD" | "NGN";
                const balance = parseFloat(
                  (
                    e.currentTarget.elements.namedItem(
                      "balance"
                    ) as HTMLInputElement
                  ).value
                );

                createAccount({
                  id: `${Date.now()}`,
                  name,
                  currency,
                  balance,
                });
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Account Name"
                required
                className="w-full border px-4 py-2 rounded"
              />
              <select
                name="currency"
                required
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">Select Currency</option>
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
              </select>
              <input
                type="number"
                name="balance"
                placeholder="Initial Balance"
                required
                min="0"
                step="0.01"
                className="w-full border px-4 py-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
