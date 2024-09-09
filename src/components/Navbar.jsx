import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  function handleLogout() {
    const url = "http://localhost:3006/auth/logout";
    fetch(url, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logout successful");
          localStorage.clear(); 
          // Clear all data from localStorage
          navigate("/"); // Redirect to the homepage or login page after logout
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  return (
    <nav
      className={`py-4 fixed top-0 left-0 w-full shadow-md ${
        theme === "light"
          ? "bg-white text-black z-50"
          : "bg-gray-800 text-white z-50"
      }`}>
      <div className="flex justify-between items-center px-8 max-w-screen-xl mx-auto">
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

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
