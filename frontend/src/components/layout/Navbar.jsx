import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🔥 Apply dark mode correctly to <html>
  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div
        className="text-xl font-extrabold text-blue-600 dark:text-blue-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        LeaveMS
      </div>

      <div className="flex items-center gap-6">
        {/* Dark Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-medium transition"
        >
          {dark ? "🌞 Light" : "🌙 Dark"}
        </button>

        {/* User */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        {user && (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
