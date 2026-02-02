import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import LeaveStatusChart from "../../components/charts/LeaveStatusChart";

export default function Reports() {
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
    totalEmployees: 0,
  });

  useEffect(() => {
    // You can replace this with real API later
    axios.get("http://localhost:5000/api/leave/manager").then((res) => {
      const leaves = res.data;

      const approved = leaves.filter(
        (l) => l.status === "Approved"
      ).length;
      const pending = leaves.filter(
        (l) => l.status === "Pending"
      ).length;
      const rejected = leaves.filter(
        (l) => l.status === "Rejected"
      ).length;

      setStats({
        approved,
        pending,
        rejected,
        totalEmployees: new Set(
          leaves.map((l) => l.email)
        ).size,
      });
    });
  }, []);

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          HR Reports & Analytics 📊
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Overview of leave trends and employee activity
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Employees</p>
          <h2 className="text-4xl font-extrabold mt-2">
            {stats.totalEmployees}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Approved</p>
          <h2 className="text-4xl font-extrabold mt-2">
            {stats.approved}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Pending</p>
          <h2 className="text-4xl font-extrabold mt-2">
            {stats.pending}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Rejected</p>
          <h2 className="text-4xl font-extrabold mt-2">
            {stats.rejected}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeaveStatusChart
          data={[
            { name: "Approved", value: stats.approved },
            { name: "Pending", value: stats.pending },
            { name: "Rejected", value: stats.rejected },
          ]}
        />

        {/* Info Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold mb-3">
            📌 Insights
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Most leaves are approved successfully</li>
            <li>• Pending requests require manager attention</li>
            <li>• Rejected leaves are minimal</li>
            <li>• Trends can guide policy decisions</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
