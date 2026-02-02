import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
// Layout protection
import ProtectedRoute from "../components/layout/ProtectedRoute";

// Employee
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import ApplyLeave from "../pages/employee/ApplyLeave";
import MyLeaves from "../pages/employee/MyLeaves";

// Manager
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ApproveLeaves from "../pages/manager/ApproveLeaves";
import TeamOverview from "../pages/manager/TeamOverview";
// HR
import HRDashboard from "../pages/hr/HRDashboard";
import Employees from "../pages/hr/Employees";
import LeaveSettings from "../pages/hr/LeaveSettings";
import Reports from "../pages/hr/Reports";

// Common
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
        {/* ================= EMPLOYEE ROUTES ================= */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/apply-leave"
          element={
            <ProtectedRoute>
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/my-leaves"
          element={
            <ProtectedRoute>
              <MyLeaves />
            </ProtectedRoute>
          }
        />

        {/* ================= MANAGER ROUTES ================= */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/approve-leaves"
          element={
            <ProtectedRoute>
              <ApproveLeaves />
            </ProtectedRoute>
          }
        />
        <Route
  path="/manager/team-overview"
  element={
    <ProtectedRoute>
      <TeamOverview />
    </ProtectedRoute>
  }
/>

        {/* ================= HR ROUTES ================= */}
       <Route
  path="/hr/dashboard"
  element={
    <ProtectedRoute role="hr">
      <HRDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/hr/employees"
  element={
    <ProtectedRoute role="hr">
      <Employees />
    </ProtectedRoute>
  }
/>

<Route
  path="/hr/leave-settings"
  element={
    <ProtectedRoute role="hr">
      <LeaveSettings />
    </ProtectedRoute>
  }
/>

<Route
  path="/hr/reports"
  element={
    <ProtectedRoute role="hr">
      <Reports />
    </ProtectedRoute>
  }
/>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
