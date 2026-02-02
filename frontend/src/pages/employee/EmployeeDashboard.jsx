import MainLayout from "../../components/layout/MainLayout";
import PageWrapper from "../../components/common/PageWrapper";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

 useEffect(() => {
  const fetchStats = () => {
    axios
      .get(
        `http://localhost:5000/api/leave/employee/stats/${user.id}`
      )
      .then((res) => setStats(res.data));
  };

  fetchStats(); // initial load

  const interval = setInterval(fetchStats, 10000); // ⏱️ every 10 sec

  return () => clearInterval(interval); // cleanup
}, [user.id]);


  return (
    <MainLayout>
      <PageWrapper>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            Employee Dashboard 👋
          </h1>
          <p className="text-gray-500">
            Welcome, {user?.name}. Here’s your leave summary.
          </p>
        </div>

        {/* REAL STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Pending */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
            <p className="text-sm opacity-80">Pending Requests</p>
            <h2 className="text-4xl font-extrabold mt-2">
              {stats.pending}
            </h2>
            <p className="mt-3 text-sm opacity-90">
              Awaiting approval
            </p>
          </div>

          {/* Approved */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
            <p className="text-sm opacity-80">Approved Leaves</p>
            <h2 className="text-4xl font-extrabold mt-2">
              {stats.approved}
            </h2>
            <p className="mt-3 text-sm opacity-90">
              Successfully approved
            </p>
          </div>

          {/* Rejected */}
          <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-2xl shadow-lg">
            <p className="text-sm opacity-80">Rejected Leaves</p>
            <h2 className="text-4xl font-extrabold mt-2">
              {stats.rejected}
            </h2>
            <p className="mt-3 text-sm opacity-90">
              Not approved
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h3 className="text-xl font-bold mb-2">
              ✍️ Apply for Leave
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Submit a new leave request.
            </p>
            <a
              href="/employee/apply-leave"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Apply Now →
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h3 className="text-xl font-bold mb-2">
              📄 My Leaves
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Track all your leave requests.
            </p>
            <a
              href="/employee/my-leaves"
              className="inline-block bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-900"
            >
              View Requests →
            </a>
          </div>
        </div>
      </PageWrapper>
    </MainLayout>
  );
}
