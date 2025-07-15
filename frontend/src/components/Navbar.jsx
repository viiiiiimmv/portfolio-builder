import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar({ isPublic = false }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePreview = () => {
    if (user?.username) {
      window.open(`/portfolio/${user.username}`, "_blank");
    }
  };

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isPortfolio = location.pathname.startsWith("/portfolio");

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link
          to={isDashboard ? "/dashboard" : "/"}
          className="text-xl font-bold text-blue-600 dark:text-white"
        >
          DevPortfolio
        </Link>

        {/* Dashboard links */}
        {isDashboard && (
          <div className="hidden md:flex gap-4 text-gray-700 dark:text-gray-300">
            <Link to="/dashboard/about" className="hover:text-blue-500">About</Link>
            <Link to="/dashboard/skills" className="hover:text-blue-500">Skills</Link>
            <Link to="/dashboard/projects" className="hover:text-blue-500">Projects</Link>
            <Link to="/dashboard/experience" className="hover:text-blue-500">Experience</Link>
          </div>
        )}

        {/* Public portfolio scroll links */}
        {isPortfolio && (
          <div className="hidden md:flex gap-4 text-gray-700 dark:text-gray-300">
            <a href="#home" className="hover:text-blue-500">Home</a>
            <a href="#skills" className="hover:text-blue-500">Skills</a>
            <a href="#projects" className="hover:text-blue-500">Projects</a>
            <a href="#experience" className="hover:text-blue-500">Experience</a>
            <a href="#contact" className="hover:text-blue-500">Contact</a>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isDashboard && (
          <>
            <button
              onClick={handlePreview}
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
            >
              Preview
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        )}

        <button
          onClick={toggleTheme}
          className="text-lg px-2 hover:text-yellow-500"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
