import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import PageWrapper from "../../components/common/PageWrapper";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/employees")
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(() => {
        setEmployees([]);
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <PageWrapper>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            Employees 👥
          </h1>
          <p className="text-gray-500">
            List of all registered employees
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">Loading employees...</p>
        )}

        {/* Table */}
        {!loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                </tr>
              </thead>

              <tbody>
                {employees.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center p-6">
                      No employees found
                    </td>
                  </tr>
                )}

                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-t dark:border-gray-700"
                  >
                    <td className="p-3 font-medium">
                      {emp.name}
                    </td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3 capitalize">
                      {emp.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageWrapper>
    </MainLayout>
  );
}
