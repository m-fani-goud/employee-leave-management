import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Icons
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data));

      // 🔁 Redirect to last requested page
      const redirectPath =
        localStorage.getItem("redirectAfterLogin");

      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath, { replace: true });
        return;
      }

      // Role-based fallback
      if (res.data.role === "employee")
        navigate("/employee/dashboard", { replace: true });
      else if (res.data.role === "manager")
        navigate("/manager/dashboard", { replace: true });
      else if (res.data.role === "hr")
        navigate("/hr/dashboard", { replace: true });
      else navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT BRAND */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome Back 👋
          </h1>
          <p className="text-blue-100 mb-6">
            Login to manage employee leaves, approvals, and
            reports in one powerful system.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 px-6">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-2">
            Login
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Sign in to continue
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          {/* Email */}
          <label className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <div className="flex items-center border rounded mb-4 px-3">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full py-2 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <div className="flex items-center border rounded mb-4 px-3">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full py-2 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Forgot */}
          <div className="text-right mb-4">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register */}
          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:underline font-medium"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
