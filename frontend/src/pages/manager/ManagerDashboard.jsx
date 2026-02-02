import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import PageWrapper from "../../components/common/PageWrapper";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaClipboardCheck,
} from "react-icons/fa";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leave/manager/stats")
      .then((res) => setStats(res.data))
      .catch(() =>
        setStats({ pending: 0, approved: 0, rejected: 0 })
      );
  }, []);

  return (
    <MainLayout>
      <PageWrapper>
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold dark:text-white">
            Manager Dashboard 👨‍💼
          </h1>
          <p className="text-gray-500 mt-2">
            Overview of employee leave approvals
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Pending Requests</p>
                <h2 className="text-5xl font-bold mt-2">
                  {stats.pending}
                </h2>
              </div>
              <FaClock className="text-5xl opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Approved</p>
                <h2 className="text-5xl font-bold mt-2">
                  {stats.approved}
                </h2>
              </div>
              <FaCheckCircle className="text-5xl opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Rejected</p>
                <h2 className="text-5xl font-bold mt-2">
                  {stats.rejected}
                </h2>
              </div>
              <FaTimesCircle className="text-5xl opacity-80" />
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Approve Leaves */}
          <div
            onClick={() => navigate("/manager/approve-leaves")}
            className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <FaClipboardCheck className="text-4xl text-green-600" />
              <div>
                <h3 className="text-xl font-bold">
                  Approve Leaves
                </h3>
                <p className="text-gray-500 text-sm">
                  Review and approve pending leave requests
                </p>
              </div>
            </div>
          </div>

          {/* Team Overview */}
          <div
            onClick={() => navigate("/manager/team-overview")}
            className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <FaUsers className="text-4xl text-indigo-600" />
              <div>
                <h3 className="text-xl font-bold">
                  Team Overview
                </h3>
                <p className="text-gray-500 text-sm">
                  View team leave history and details
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </MainLayout>
  );
}
