import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";

export default function ApproveLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leave/manager")
      .then((res) => setLeaves(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/leave/approve/${id}`,
      { status }
    );

    setLeaves(
      leaves.map((l) =>
        l.id === id ? { ...l, status } : l
      )
    );
  };

  const badge = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Approve Leave Requests ✅
        </h1>
        <p className="text-gray-500">
          Review and take action on employee leave requests
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {leaves.length === 0 && (
          <p>No leave requests found</p>
        )}

        {leaves.map((l) => (
          <div
            key={l.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">
                {l.email}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${badge(
                  l.status
                )}`}
              >
                {l.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>{l.leave_type}</strong> | {l.start_date} → {l.end_date}
            </p>

            <p className="mt-3 text-gray-700 dark:text-gray-200">
              {l.reason}
            </p>

            {l.status === "Pending" && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() =>
                    updateStatus(l.id, "Approved")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(l.id, "Rejected")
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
