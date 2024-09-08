import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-8">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold tracking-wide hover:text-blue-500 transition duration-200">
          <Link to="/">Project Management</Link>
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link
            to="/about"
            className="hover:text-blue-500 transition duration-200">
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-500 transition duration-200">
            Contact
          </Link>
          {/* <Link
            to="/dashboard"
            className="hover:text-blue-500 transition duration-200">
            Dashboard
          </Link> */}

          {/* Login Button */}
          <Link to="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
