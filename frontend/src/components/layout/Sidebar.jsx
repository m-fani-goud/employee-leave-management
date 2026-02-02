import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [collapsed, setCollapsed] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-900 min-h-screen shadow-lg transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5">
        <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          {collapsed ? "LM" : "LeaveMS"}
        </span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-2">
        {/* EMPLOYEE */}
        {user?.role === "employee" && (
          <>
            <NavLink
              to="/employee/dashboard"
              className={linkClass}
            >
              🏠 {!collapsed && "Dashboard"}
            </NavLink>

            <NavLink
              to="/employee/apply-leave"
              className={linkClass}
            >
              ✍️ {!collapsed && "Apply Leave"}
            </NavLink>

            <NavLink
              to="/employee/my-leaves"
              className={linkClass}
            >
              📄 {!collapsed && "My Leaves"}
            </NavLink>
          </>
        )}

        {/* MANAGER */}
        {user?.role === "manager" && (
          <>
            <NavLink
              to="/manager/dashboard"
              className={linkClass}
            >
              📊 {!collapsed && "Dashboard"}
            </NavLink>

            <NavLink
              to="/manager/approve-leaves"
              className={linkClass}
            >
              ✅ {!collapsed && "Approve Leaves"}
            </NavLink>
            <NavLink
  to="/manager/team-overview"
  className={linkClass}
>
  👥 {!collapsed && "Team Overview"}
</NavLink>

          </>
        )}

        {/* HR */}
        {user?.role === "hr" && (
          <>
            <NavLink
              to="/hr/dashboard"
              className={linkClass}
            >
              📈 {!collapsed && "Dashboard"}
            </NavLink>

            <NavLink
              to="/hr/employees"
              className={linkClass}
            >
              👥 {!collapsed && "Employees"}
            </NavLink>

            <NavLink
              to="/hr/leave-settings"
              className={linkClass}
            >
              ⚙️ {!collapsed && "Leave Settings"}
            </NavLink>
            <NavLink to="/hr/reports" className={linkClass}>
  📊 {!collapsed && "Reports"}
</NavLink>

          </>
        )}
      </nav>
    </aside>
  );
}
