import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [taskData, setTaskData] = useState({
    totalTasks: 0,
    computedTasks: 0,
    tasksInProgress: 0,
    todos: 0,
    priorityData: { high: 0, medium: 0, normal: 0, low: 0 },
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. Redirecting to login page...');
        // window.location.href = '/login';
        return;
      }

      const response = await fetch("http://localhost:3006/task/tasks", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        // Update state with fetched data
        const totalTasks = data.length;
        const computedTasks = data.filter(task => task.status === 'completed').length;
        const tasksInProgress = data.filter(task => task.status === 'in-progress').length;
        const todos = data.filter(task => task.status === 'pending').length;
        const priorityData = {
          high: data.filter(task => task.priority === 'high').length,
          medium: data.filter(task => task.priority === 'medium').length,
          normal: data.filter(task => task.priority === 'normal').length,
          low: data.filter(task => task.priority === 'low').length,
        };

        setTaskData({
          totalTasks,
          computedTasks,
          tasksInProgress,
          todos,
          priorityData,
        });
      } else {
        const text = await response.text();
        console.error("Response is not JSON:", text);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Check if the error is related to unauthorized access
      if (error.message.includes("401")) {
        // window.location.href = '/login';
      }
    }
  };

  const chartData = {
    labels: ['High', 'Medium', 'Normal', 'Low'],
    datasets: [{
      data: Object.values(taskData.priorityData),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    maintainAspectRatio: false, // Ensure the chart resizes properly
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content area */}
        <main className="flex-1 p-6 bg-gray-100 flex">
          {/* Pie Chart in the center */}
          <div className="flex-1 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xl flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Task Priority Chart</h2>
              <div className="w-full h-[350px]">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Cards aligned to the right */}
          <div className="w-1/4 space-y-6">
            <div className="bg-white mt-20 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Total Tasks</h2>
              <p className="text-3xl font-bold text-blue-600">{taskData.totalTasks}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Completed Tasks</h2>
              <p className="text-3xl font-bold text-green-600">{taskData.computedTasks}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Tasks In Progress</h2>
              <p className="text-3xl font-bold text-yellow-500">{taskData.tasksInProgress}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Todos</h2>
              <p className="text-3xl font-bold text-red-500">{taskData.todos}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
