import { useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";

export default function ApplyLeave() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLeave = async () => {
    if (!form.leaveType || !form.startDate || !form.endDate || !form.reason) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/leave/apply", {
        userId: user.id,
        ...form,
      });

      setMessage("✅ Leave request submitted successfully");
      setForm({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
    } catch {
      setMessage("❌ Failed to submit leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Apply for Leave ✍️
        </h1>
        <p className="text-gray-500">
          Submit your leave request in a few steps
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-xl bg-white rounded-2xl shadow p-8">
        {message && (
          <div className="mb-4 text-sm bg-blue-100 text-blue-700 p-2 rounded">
            {message}
          </div>
        )}

        {/* Leave Type */}
        <label className="block mb-1 font-medium">
          Leave Type
        </label>
        <select
          name="leaveType"
          value={form.leaveType}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
        >
          <option value="">Select Leave Type</option>
          <option value="Annual">Annual Leave</option>
          <option value="Sick">Sick Leave</option>
          <option value="Casual">Casual Leave</option>
        </select>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Reason */}
        <label className="block mt-4 mb-1 font-medium">
          Reason
        </label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter reason for leave"
        />

        {/* Submit */}
        <button
          onClick={submitLeave}
          disabled={loading}
          className={`mt-6 w-full py-2 rounded text-white font-semibold ${
            loading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Leave"}
        </button>
      </div>
    </MainLayout>
  );
}
