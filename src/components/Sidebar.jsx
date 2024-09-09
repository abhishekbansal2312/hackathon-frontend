import React, { useContext, useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaCalendarAlt,
  FaCog,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; // Adjust the path as needed
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
// import ThemeToggle from "./ThemeToggle"; // Adjust the path as needed
import "../App.css";
const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve the token from cookies
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token to get the role
      setRole(decodedToken.role); // Set the role in the state
    }
  }, []);

  return (
    <aside
      className={`w-64 pt-20 min-h-screen h-auto p-6 flex flex-col justify-between shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}>
      {/* Sidebar Menu */}
      <ul className="space-y-3 fixed">
        {/* Dashboard Link */}
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 transform hover:translate-x-2 ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}>
            <FaTachometerAlt className="mr-3 text-xl" />
            <span className="text-lg font-medium">Dashboard</span>
          </Link>
        </li>

        {/* Tasks Link */}
        <li>
          <Link
            to="/tasks"
            className={`flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 transform hover:translate-x-3 hover:scale-105 ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}>
            <FaTasks className="mr-3 text-xl" />
            <span className="text-lg font-medium">Tasks</span>
          </Link>
        </li>

        {/* Calendar Link */}
        <li>
          <Link
            to="/calendar"
            className={`flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 transform hover:translate-x-2 ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}>
            <FaCalendarAlt className="mr-3 text-xl" />
            <span className="text-lg font-medium">Calendar</span>
          </Link>
        </li>

        {/* Settings Link */}
        <li>
          <Link
            to="/settings"
            className={`flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 transform hover:translate-x-2 ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}>
            <FaCog className="mr-3 text-xl" />
            <span className="text-lg font-medium">Settings</span>
          </Link>
        </li>

        {/* Users Link */}
        {role === "admin" && (
          <li>
            <Link
              to="/users"
              className={`flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 transform hover:translate-x-2 ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}>
              <FaUsers className="mr-3 text-xl" />
              <span className="text-lg font-medium">Users</span>
            </Link>
          </li>
        )}
      </ul>

      {/* Bottom Section with Theme Toggle Button */}
      {/* Bottom Section */}
      <div className="mt-auto text-center text-sm">
        <p>© 2024 Your Company</p>
      </div>
    </aside>
  );
};

export default Sidebar;
