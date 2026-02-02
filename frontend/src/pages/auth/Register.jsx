import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    // 🔐 Validation
    if (!form.name || !form.email || !form.password) {
      setError("⚠️ All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("⚠️ Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      setSuccess(
        "✅ Registration successful! Redirecting to login..."
      );

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "❌ Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE – IMAGE / BRAND */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold mb-4">
            Join Our Leave <br /> Management System
          </h1>
          <p className="text-indigo-100 mb-6">
            Create your account and start managing employee
            leave requests efficiently.
          </p>

          <ul className="space-y-3 text-indigo-100">
            <li>📝 Easy leave applications</li>
            <li>✅ Manager approvals</li>
            <li>📊 HR leave tracking</li>
            <li>🔐 Secure authentication</li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE – REGISTER FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account 🚀
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Register to get started
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-4 text-sm text-green-600 bg-green-100 p-2 rounded">
              {success}
            </div>
          )}

          {/* NAME */}
          <label className="block mb-1 font-medium text-gray-700">
            Full Name
          </label>
          <div className="flex items-center border rounded mb-4 px-3">
            <span className="mr-2">👤</span>
            <input
              name="name"
              placeholder="John Doe"
              className="w-full py-2 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <label className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <div className="flex items-center border rounded mb-4 px-3">
            <span className="mr-2">📧</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full py-2 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <div className="flex items-center border rounded mb-4 px-3">
            <span className="mr-2">🔒</span>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full py-2 outline-none"
              onChange={handleChange}
            />
            <span
              className="cursor-pointer text-sm text-indigo-600 ml-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* ROLE */}
          <label className="block mb-1 font-medium text-gray-700">
            Register As
          </label>
          <select
            name="role"
            className="w-full mb-5 px-3 py-2 border rounded"
            onChange={handleChange}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
          </select>

          {/* REGISTER BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer hover:underline font-medium"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
