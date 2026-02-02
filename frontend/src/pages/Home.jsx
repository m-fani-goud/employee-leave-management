import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "employee") navigate("/employee/dashboard");
      if (user.role === "manager") navigate("/manager/dashboard");
      if (user.role === "hr") navigate("/hr/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE – BRAND / INFO */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">
            Online Employee <br />
            Leave Management System
          </h1>

          <p className="text-blue-100 mb-6">
            A smart and efficient platform to manage employee
            leave requests, approvals, and balances — all in one
            place.
          </p>

          <ul className="space-y-3 text-blue-100">
            <li>📅 Apply and track leaves easily</li>
            <li>✅ Manager approval workflow</li>
            <li>📊 HR reports & analytics</li>
            <li>🔐 Secure authentication system</li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE – CTA */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-100 px-6">
        <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-3">
            Welcome 👋
          </h2>

          <p className="text-gray-600 mb-6">
            Get started with a modern leave management system
            built using React, Node.js, MySQL & Tailwind CSS.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              🔑 Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="w-full border border-blue-600 text-blue-600 py-2 rounded font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              ✨ Create Account
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Built for employees, managers & HR teams
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()} Online Employee Leave
          Management System
        </p>
      </div>
    </div>
  );
}
