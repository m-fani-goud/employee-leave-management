import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import { Link } from "react-router-dom";

export default function HRDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalEmployees: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const fetchStats = () => {
    axios
      .get("http://localhost:5000/api/hr/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch(() =>
        setStats({
          totalEmployees: 0,
          approved: 0,
          pending: 0,
          rejected: 0,
        })
      );
  };

  useEffect(() => {
    fetchStats(); // initial load

    // 🔁 real-time (polling every 5 seconds)
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          HR Dashboard 🧑‍💼
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome {user?.name}, manage employees and reports
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Total Employees</p>
          <h2 className="text-4xl font-extrabold mt-2">
            {stats.totalEmployees}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Approved Leaves</p>
          <h2 className="text-4xl font-extrabold mt-2">
            {stats.approved}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Pending Leaves</p>
          <h2 className="text-4xl font-extrabold mt-2">
            {stats.pending}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Rejected Leaves</p>
          <h2 className="text-4xl font-extrabold mt-2">
            {stats.rejected}
          </h2>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h3 className="text-xl font-bold mb-2">👥 Manage Employees</h3>
          <p className="text-gray-600 mb-4">
            View and manage employee details and leave balances.
          </p>
          <Link
            to="/hr/employees"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Manage
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h3 className="text-xl font-bold mb-2">⚙️ Leave Settings</h3>
          <p className="text-gray-600 mb-4">
            Configure leave types and yearly limits.
          </p>
          <Link
            to="/hr/leave-settings"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Configure
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h3 className="text-xl font-bold mb-2">📈 Reports & Analytics</h3>
          <p className="text-gray-600 mb-4">
            Analyze leave trends across departments.
          </p>
          <Link
            to="/hr/reports"
            className="bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold"
          >
            View Reports
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
