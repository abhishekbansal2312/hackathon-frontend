import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    // Check if the token cookie is present
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedin(true); // User is logged in
    } else {
      setIsLoggedin(false); // User is not logged in
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header with Navbar */}
      <header className="bg-gradient-to-r from-blue-900 via-black to-purple-900 text-white py-3 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 animate-fadeIn">
            <FontAwesomeIcon
              icon={faTrello}
              className="text-4xl animate-spin"
            />
            <span className="text-2xl font-bold tracking-wide">
              WP Project Manager
            </span>
          </div>
          {/* Buttons */}
          <div className="flex space-x-4">
            {!isLoggedin && (
              <Link to="/login">
                <button className="bg-transparent border border-gray-500 py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                  Login
                </button>
              </Link>
            )}
            <Link to="/dashboard">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-6 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-r from-black to-gray-900 py-24 text-center h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Elevate Your{" "}
            <span className="text-indigo-400">Project Management</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Boost Your Productivity with Futuristic Solutions
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            WP Project Manager is an open-source solution designed to streamline
            your work processes and ensure timely project delivery with ease.
          </p>
          <Link to="/dashboard">
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
              Start Now
            </button>
          </Link>
             
    <div className="mt-12">
      <img
        className="mx-auto rounded-lg shadow-lg"
        src="/homephoto.jpg"
        alt="Not available"
      />
    </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></div>
      </section>
      */}
      <section className="relative bg-gradient-to-r from-black to-gray-900 py-24 text-center min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Elevate Your{" "}
            <span className="text-indigo-400">Project Management</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Boost Your Productivity with Futuristic Solutions
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            WP Project Manager is an open-source solution designed to streamline
            your work processes and ensure timely project delivery with ease.
          </p>
          <Link to="/dashboard">
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
              Start Now
            </button>
          </Link>
          {/* Image */}
          <div className="mt-12">
            <img
              className="mx-auto rounded-lg shadow-lg w-full h-auto object-cover" // Ensures the image covers the container
              src="/homephoto4.jpg"
              alt="Project Management"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></div>
      </section>
      {/* New Section: One product, unlimited solutions */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-center mb-4 text-green-300">
            One product, unlimited solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Excepturi sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit laborum — semper quis lectus nulla.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Card 1 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">
                More Speed, Less Spend
              </h3>
              <p className="text-gray-300 mb-4">
                Duis aute irure dolor in reprehenderit, exceptuer sint occaecat
                amet consectetur elit.
              </p>
              <ul className="text-green-400 space-y-2">
                <li>• Real-time updates</li>
                <li>• Seamless collaboration</li>
                <li>• Powerful analytics</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">
                Keep Projects on Schedule
              </h3>
              <p className="text-gray-300 mb-4">
                Excepteur sint occaecat consectetur adipiscing elit, tempor
                incididunt labore.
              </p>
              <ul className="text-green-400 space-y-2">
                <li>• Automated task management</li>
                <li>• Progress tracking</li>
                <li>• Team transparency</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">
                Scale Efficiently
              </h3>
              <p className="text-gray-300 mb-4">
                Amet consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </p>
              <ul className="text-green-400 space-y-2">
                <li>• Multi-platform integration</li>
                <li>• Workflow automation</li>
                <li>• Customizable dashboards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* New Section: One product, unlimited solutions */}
      <section className="bg-black py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-center mb-6 text-green-300">
            One product, unlimited solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
            Excepturi sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit laborum — semper quis lectus nulla.
          </p>

          {/* Row 1: Content Left, Image Right */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            {/* Content */}
            <div className="md:w-1/2 text-left space-y-4">
              <h3 className="text-3xl font-bold text-indigo-400">
                More Speed, Less Spend
              </h3>
              <p className="text-lg text-gray-300">
                Keep projects on schedule. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
              <ul className="text-green-400 space-y-2">
                <li>✔ Duis aute irure dolor in reprehenderit</li>
                <li>✔ Excepteur sint occaecat</li>
                <li>✔ Amet consectetur adipiscing elit</li>
              </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                className="rounded-lg shadow-lg"
                src="https://t3.ftcdn.net/jpg/07/64/19/46/240_F_764194617_mriQFo2VdT6WoDw4ihl7G695lZYmI9sJ.jpg"
                alt="Feature 1"
              />
            </div>
          </div>

          {/* Row 2: Image Left, Content Right */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            {/* Image */}
            <div className="md:w-1/2 order-2 md:order-1 mt-8 md:mt-0">
              <img
                className="rounded-lg shadow-lg"
                src="https://t3.ftcdn.net/jpg/02/13/05/58/240_F_213055873_eCxNAjgfwP9JE6MM4Io2s0qpNOPxOoIs.jpg"
                alt="Feature 2"
              />
            </div>

            {/* Content */}
            <div className="md:w-1/2 text-left space-y-4 order-1 md:order-2">
              <h3 className="text-3xl font-bold text-indigo-400">
                Keep Projects on Schedule
              </h3>
              <p className="text-lg text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul className="text-green-400 space-y-2">
                <li>✔ Duis aute irure dolor in reprehenderit</li>
                <li>✔ Excepteur sint occaecat</li>
                <li>✔ Amet consectetur adipiscing elit</li>
              </ul>
            </div>
          </div>

          {/* Row 3: Content Left, Image Right */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Content */}
            <div className="md:w-1/2 text-left space-y-4">
              <h3 className="text-3xl font-bold text-indigo-400">
                Scale Efficiently
              </h3>
              <p className="text-lg text-gray-300">
                Amet consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <ul className="text-green-400 space-y-2">
                <li>✔ Duis aute irure dolor in reprehenderit</li>
                <li>✔ Excepteur sint occaecat</li>
                <li>✔ Amet consectetur adipiscing elit</li>
              </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                className="rounded-lg shadow-lg"
                src="https://t3.ftcdn.net/jpg/07/64/19/46/240_F_764194617_mriQFo2VdT6WoDw4ihl7G695lZYmI9sJ.jpg"
                alt="Feature 3"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-black py-24 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-xl italic mb-4">
                "WP Project Manager transformed our workflow. It's incredibly
                intuitive and powerful."
              </p>
              <h3 className="text-lg font-bold">John Doe, CEO at TechCorp</h3>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-xl italic mb-4">
                "We've seen a 30% increase in productivity since adopting WP
                Project Manager."
              </p>
              <h3 className="text-lg font-bold">
                Jane Smith, Project Manager at InnovateX
              </h3>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-xl italic mb-4">
                "Highly recommend this tool for any team looking to streamline
                their processes."
              </p>
              <h3 className="text-lg font-bold">Samuel Lee, CTO at DevHub</h3>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center mt-auto">
        <p className="text-sm">
          &copy; 2024 WP Project Manager. All rights reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-6">
          <Link
            to="/terms"
            className="hover:underline text-gray-400 transition-colors duration-300"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="hover:underline text-gray-400 transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/support"
            className="hover:underlinetext-gray-400 transition-colors duration-300"
          >
            {" "}
            Support{" "}
          </Link>{" "}
        </div>{" "}
      </footer>{" "}
    </div>
  );
};

export default HomePage;
