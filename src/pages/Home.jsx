import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const HomePage = () => {
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
            <Link to="/login">
              <button className="bg-transparent border border-gray-500 py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                Login
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-6 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black to-gray-900 py-24 text-center h-screen">
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
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></div>
      </section>
      {/* Features Section with Animation */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black py-24 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-20 animate-[moveBackground_10s_linear_infinite]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-center mb-12 animate-slideInUp">
            Features We Provide
          </h2>
          <div className="space-y-16">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-6 space-y-8 md:space-y-0 animate-slideInLeft">
              {/* Image */}
              <img
                className="w-full md:w-1/2 max-w-md rounded-lg shadow-lg transform transition-transform duration-300"
                src="https://t3.ftcdn.net/jpg/07/64/19/46/240_F_764194617_mriQFo2VdT6WoDw4ihl7G695lZYmI9sJ.jpg"
                alt="Feature 1"
              />
              {/* Text Content */}
              <div className="md:w-1/2 text-center md:text-left px-4">
                <h3 className="text-3xl font-bold mb-4 text-indigo-400">
                  Seamless Collaboration
                </h3>
                <p className="text-lg text-gray-300 mb-4">
                  Real-time collaboration tools that bring your team together
                  like never before. Share updates, files, and feedback
                  seamlessly.
                </p>
                <p className="text-lg text-gray-300">
                  Engage with your team using powerful tools designed for
                  efficiency. Create tasks, assign responsibilities, and monitor
                  progress from a unified dashboard.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-6 space-y-8 md:space-y-0 animate-slideInRight">
              {/* Text Content */}
              <div className="md:w-1/2 text-center md:text-left px-4 order-2 md:order-1">
                <h3 className="text-3xl font-bold mb-4 text-indigo-400">
                  Advanced Analytics
                </h3>
                <p className="text-lg text-gray-300 mb-4">
                  In-depth project analytics and insights to help you make
                  data-driven decisions, optimizing efficiency and success
                  rates.
                </p>
                <p className="text-lg text-gray-300">
                  Our advanced analytics dashboard provides detailed metrics on
                  project timelines, resource allocation, and team productivity,
                  giving you the data you need to lead effectively.
                </p>
              </div>
              {/* Image */}
              <img
                className="w-full md:w-1/2 max-w-md rounded-lg shadow-lg transform transition-transform duration-300 order-1 md:order-2"
                src="https://t3.ftcdn.net/jpg/02/13/05/58/240_F_213055873_eCxNAjgfwP9JE6MM4Io2s0qpNOPxOoIs.jpg"
                alt="Feature 2"
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
            className="hover:underline text-gray-400 transition-colors duration-300">
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="hover:underline text-gray-400 transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link
            to="/support"
            className="hover:underlinetext-gray-400 transition-colors duration-300">
            {" "}
            Support{" "}
          </Link>{" "}
        </div>{" "}
      </footer>{" "}
    </div>
  );
};

export default HomePage;
