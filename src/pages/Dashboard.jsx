import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Navbar />
        {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
      </main>
    </div>
  );
};

export default Dashboard;
