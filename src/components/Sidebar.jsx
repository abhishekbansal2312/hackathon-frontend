import React from "react";
import { FaTachometerAlt, FaTasks, FaCalendarAlt, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 pt-20 min-h-screen bg-gray-800 text-white h-auto p-6 flex flex-col justify-between shadow-md">
      {/* Sidebar Menu */}
      <ul className="space-y-3">
        {/* Adjusted gap between items */}
        <li>
          <Link
            to="/dashboard"
            className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 transform hover:translate-x-2">
            <FaTachometerAlt className="mr-3 text-xl" />
            <span className="text-lg font-medium">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="/tasks"
            className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 transform hover:translate-x-2">
            <FaTasks className="mr-3 text-xl" />
            <span className="text-lg font-medium">Tasks</span>
          </Link>
        </li>

        <li>
          <Link
            to="/calendar"
            className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 transform hover:translate-x-2">
            <FaCalendarAlt className="mr-3 text-xl" />
            <span className="text-lg font-medium">Calendar</span>
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 transform hover:translate-x-2">
            <FaCog className="mr-3 text-xl" />
            <span className="text-lg font-medium">Settings</span>
          </Link>
        </li>
      </ul>

      {/* Bottom Section */}
      <div className="mt-auto">
        <p className="text-sm text-gray-500">© 2024 Your Company</p>
      </div>
    </aside>
  );
};

export default Sidebar;
