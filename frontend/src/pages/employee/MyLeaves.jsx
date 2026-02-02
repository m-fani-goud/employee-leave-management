import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";

export default function MyLeaves() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/leave/my/${user.id}`)
      .then((res) => setLeaves(res.data));
  }, [user.id]);

  const statusStyle = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Leave Requests 📄
        </h1>
        <p className="text-gray-500">
          Track status of your leave applications
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  No leave requests found
                </td>
              </tr>
            )}

            {leaves.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-3">{l.leave_type}</td>
                <td className="p-3">{l.start_date}</td>
                <td className="p-3">{l.end_date}</td>
                <td className="p-3">{l.reason}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyle(
                      l.status
                    )}`}
                  >
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
