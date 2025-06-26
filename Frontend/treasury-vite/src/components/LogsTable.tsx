import React from "react";

type Log = {
  id: number;
  src_name: string;
  dst_name: string;
  amount: number;
  rate: number;
  note: string;
  timestamp: string;
  scheduled_date?: string;
};

export const LogsTable = ({ logs }: { logs: Log[] }) => {
  if (!logs.length) {
    return (
      <div className="text-center text-gray-500 mt-4">No logs to display.</div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6 bg-white rounded shadow">
      <table className="min-w-full text-sm table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">From</th>
            <th className="p-2 text-left">To</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Rate</th>
            <th className="p-2 text-left">Note</th>
            <th className="p-2 text-left">Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t hover:bg-gray-50">
              <td className="p-2">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="p-2">{log.src_name}</td>
              <td className="p-2">{log.dst_name}</td>
              <td className="p-2">{log.amount.toFixed(2)}</td>
              <td className="p-2">{log.rate.toFixed(2)}</td>
              <td className="p-2">{log.note}</td>
              <td className="p-2">{log.scheduled_date || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
