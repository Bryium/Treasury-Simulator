import { useState } from "react";

export default function FutureTransfer() {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const simulate = () => {
    alert(`Simulated transfer on ${date} with description: ${description}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Simulate Future Transfer</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 mb-2 border"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 mb-2 border"
      />
      <button
        onClick={simulate}
        className="bg-green-500 text-white p-2 w-full rounded"
      >
        Simulate
      </button>
    </div>
  );
}
