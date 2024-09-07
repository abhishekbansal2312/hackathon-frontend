import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-200 h-screen p-4">
      <ul>
        <li className="mb-4">
          <a href="/" className="text-lg font-semibold">Dashboard</a>
        </li>
        <li className="mb-4">
          <a href="/projects" className="text-lg font-semibold">Projects</a>
        </li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
