import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async () => {
    setError("");
    setSuccess("");

    if (!email || !newPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email, newPassword }
      );

      setSuccess("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-3 text-sm text-green-600 bg-green-100 p-2 rounded">
            {success}
          </div>
        )}

        <input
          type="email"
          placeholder="Registered Email"
          className="w-full mb-3 px-3 py-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password with show/hide */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-2 cursor-pointer text-sm text-blue-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Reset Password
        </button>

        <p
          className="text-center mt-4 text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}
