// src/App.tsx
import { useState } from "react";
import Accounts from "./components/Accounts";
import TransferFunds from "./components/TransferFund";
import TransferLogs from "./components/TransferLogs";
import SimulateFutureTransfer from "./components/FutureTransfer";


function App() {
  const [activeTab, setActiveTab] = useState("accounts");

  const renderComponent = () => {
    switch (activeTab) {
      case "accounts":
        return <Accounts />;
      case "transfer":
        return <TransferFunds />;
      case "logs":
        return <TransferLogs />;
      case "simulate":
        return <SimulateFutureTransfer />;
      default:
        return <Accounts />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center space-x-6 mb-8">
        <button
          onClick={() => setActiveTab("accounts")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "accounts"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Accounts
        </button>
        <button
          onClick={() => setActiveTab("transfer")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "transfer"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Transfer Funds
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "logs" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Transfer Logs
        </button>
        <button
          onClick={() => setActiveTab("simulate")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "simulate"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Simulate Future Transfer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
