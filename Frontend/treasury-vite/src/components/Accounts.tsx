import React from "react";

type Account = {
  id: number;
  name: string;
  currency: string;
  balance: number;
};

export const Accounts = ({
  accounts,
  onDelete,
}: {
  accounts: Account[];
  onDelete: (id: number) => void;
}) => {
  if (!accounts.length) {
    return (
      <div className="text-center text-gray-500 p-4">
        No accounts available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {accounts.map((acc) => (
        <div
          key={acc.id}
          className="bg-white border rounded shadow-md p-4 flex flex-col"
        >
          <div className="mb-2">
            <h2 className="text-xl font-semibold">{acc.name}</h2>
            <p className="text-sm text-gray-500">{acc.currency}</p>
          </div>
          <p className="text-lg font-bold text-green-600">
            {acc.balance.toFixed(2)}
          </p>
          <button
            onClick={() => onDelete(acc.id)}
            className="mt-auto bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded self-start"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
