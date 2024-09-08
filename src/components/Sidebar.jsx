import React from "react";
import { FaTachometerAlt, FaTasks, FaCalendarAlt, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-6 flex flex-col justify-between shadow-md">
      {/* Sidebar Menu */}
      <ul className="space-y-3">
        {" "}
        {/* Adjusted gap between items */}
        <li>
          <a
            href="/"
            className="flex items-center p-3 rounded-md hover:bg-gray-700 transition duration-200">
            <FaTachometerAlt className="mr-3 text-xl" />
            <span className="text-lg font-medium">Dashboard</span>
          </a>
        </li>
        <li>
          <a
            href="/tasks"
            className="flex items-center p-3 rounded-md hover:bg-gray-700 transition duration-200">
            <FaTasks className="mr-3 text-xl" />
            <span className="text-lg font-medium">Tasks</span>
          </a>
        </li>
        <li>
          <a
            href="/calendar"
            className="flex items-center p-3 rounded-md hover:bg-gray-700 transition duration-200">
            <FaCalendarAlt className="mr-3 text-xl" />
            <span className="text-lg font-medium">Calendar</span>
          </a>
        </li>
        <li>
          <a
            href="/settings"
            className="flex items-center p-3 rounded-md hover:bg-gray-700 transition duration-200">
            <FaCog className="mr-3 text-xl" />
            <span className="text-lg font-medium">Settings</span>
          </a>
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
