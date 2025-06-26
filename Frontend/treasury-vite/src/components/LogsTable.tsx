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
  return (
    <table className="w-full mt-4 border">
      <thead>
        <tr className="bg-gray-100">
          <th>Date</th>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
          <th>Rate</th>
          <th>Note</th>
          <th>Scheduled</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id} className="text-sm text-center border-t">
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.src_name}</td>
            <td>{log.dst_name}</td>
            <td>{log.amount}</td>
            <td>{log.rate}</td>
            <td>{log.note}</td>
            <td>{log.scheduled_date || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
