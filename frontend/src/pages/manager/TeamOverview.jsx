import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import PageWrapper from "../../components/common/PageWrapper";

export default function TeamOverview() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leave/team-overview")
      .then((res) => setTeam(res.data));
  }, []);

  return (
    <MainLayout>
      <PageWrapper>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Team Overview 👥
          </h1>
          <p className="text-gray-500">
            Leave statistics for your team
          </p>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-center">Total</th>
                <th className="p-3 text-center">Approved</th>
                <th className="p-3 text-center">Pending</th>
                <th className="p-3 text-center">Rejected</th>
              </tr>
            </thead>

            <tbody>
              {team.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-6">
                    No team data found
                  </td>
                </tr>
              )}

              {team.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-t dark:border-gray-700"
                >
                  <td className="p-3">
                    <div>
                      <p className="font-semibold">
                        {emp.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {emp.email}
                      </p>
                    </div>
                  </td>

                  <td className="p-3 text-center font-bold">
                    {emp.total}
                  </td>

                  <td className="p-3 text-center">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                      {emp.approved}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                      {emp.pending}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                      {emp.rejected}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageWrapper>
    </MainLayout>
  );
}
