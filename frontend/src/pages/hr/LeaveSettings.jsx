import { useState, useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";

export default function LeaveSettings() {
  const [limits, setLimits] = useState({
    Annual: 12,
    Sick: 5,
    Casual: 3,
  });

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("leaveLimits"));
    if (saved) setLimits(saved);
  }, []);

  const saveLimits = () => {
    localStorage.setItem(
      "leaveLimits",
      JSON.stringify(limits)
    );
    alert("Leave limits updated successfully");
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">
        Leave Type Settings
      </h1>

      <div className="bg-white p-6 rounded shadow max-w-md">
        {Object.keys(limits).map((type) => (
          <div key={type} className="mb-4">
            <label className="block mb-1 font-medium">
              {type} Leave
            </label>
            <input
              type="number"
              min="0"
              className="w-full px-3 py-2 border rounded"
              value={limits[type]}
              onChange={(e) =>
                setLimits({
                  ...limits,
                  [type]: Number(e.target.value),
                })
              }
            />
          </div>
        ))}

        <button
          onClick={saveLimits}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Limits
        </button>
      </div>
    </MainLayout>
  );
}
