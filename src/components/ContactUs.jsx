


import React from 'react';
import { LocationMarkerIcon, PhoneIcon, SupportIcon } from '@heroicons/react/outline';

const ContactPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="absolute inset-0 flex min-h-screen items-center justify-center">
        <div className="flex bg-gray-900 rounded-lg shadow-lg w-full max-w-6xl overflow-hidden">
          {/* Left Side Background */}
          <div className="relative w-1/2 bg-gray-800 text-white p-8 flex flex-col justify-center items-start space-y-8">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 opacity-80"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col space-y-8">
              <div className="flex items-start space-x-6 animate-fadeIn">
                <LocationMarkerIcon className="h-10 w-10 text-teal-300" />
                <div className="w-full space-y-2">
                  <h3 className="text-2xl font-bold">Address</h3>
                  <p className="text-lg">1234 Street Name, City, Country</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 animate-fadeIn animate-delay-200">
                <PhoneIcon className="h-10 w-10 text-teal-300" />
                <div className="w-full space-y-2">
                  <h3 className="text-2xl font-semibold">Let's Talk</h3>
                  <p className="text-lg">Contact us for any inquiries or support. We are here to help you!</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 animate-fadeIn animate-delay-400">
                <SupportIcon className="h-10 w-10 text-teal-300" />
                <div className="w-full space-y-2">
                  <h3 className="text-2xl font-semibold">General Support</h3>
                  <p className="text-lg">Email us at support@example.com. We will get back to you as soon as possible.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="w-1/2 bg-gray-700 text-white p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium">Name</label>
                <input type="text" id="name" name="name" className="mt-1 p-3 w-full bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium">Email</label>
                <input type="email" id="email" name="email" className="mt-1 p-3 w-full bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              </div>
              <div>
                <label htmlFor="subject" className="block text-lg font-medium">Subject</label>
                <input type="text" id="subject" name="subject" className="mt-1 p-3 w-full bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium">Message</label>
                <textarea id="message" name="message" rows="4" className="mt-1 p-3 w-full bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500" required></textarea>
              </div>
              <div>
                <button type="submit" className="w-full py-3 bg-teal-600 border border-teal-700 rounded-md text-white font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
