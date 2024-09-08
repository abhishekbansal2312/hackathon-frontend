import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // Logout function
  const navigate = useNavigate();
  function handleLogout() {
    const url = "http://localhost:3006/auth/logout";
    fetch(url, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logout successful");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }
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

          {/* logout Button */}
          
          <button onClick={handleLogout}  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
            Logout
          </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
