import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import CountUp from "react-countup";
import { motion } from "framer-motion";

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
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found. Redirecting to login page...");
        return;
      }

      const response = await fetch("http://localhost:3006/task/tasks", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        const totalTasks = data.length;
        const computedTasks = data.filter(
          (task) => task.status === "completed"
        ).length;
        const tasksInProgress = data.filter(
          (task) => task.status === "in-progress"
        ).length;
        const todos = data.filter((task) => task.status === "pending").length;
        const priorityData = {
          high: data.filter((task) => task.priority === "high").length,
          medium: data.filter((task) => task.priority === "medium").length,
          normal: data.filter((task) => task.priority === "normal").length,
          low: data.filter((task) => task.priority === "low").length,
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
      if (error.message.includes("401")) {
        // window.location.href = '/login';
      }
    }
  };

  const priorityChartData = {
    labels: ["High", "Medium", "Normal", "Low"],
    datasets: [
      {
        data: Object.values(taskData.priorityData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const statusChartData = {
    labels: ["Completed", "In Progress", "Todos"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [
          taskData.computedTasks,
          taskData.tasksInProgress,
          taskData.todos,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          padding: 20,
          font: {
            size: 14,
            color: "#FFFFFF", // Set legend text color to white
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
        bodyFont: {
          size: 14,
          color: "#FFFFFF", // Set tooltip text color to white
        },
        titleFont: {
          size: 16,
          color: "#FFFFFF", // Set tooltip title color to white
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex bg-gray-800 text-yellow-400">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content area */}
        <main className="flex-1 p-6 bg-gray-700 text-yellow-400">
          {/* Cards Section */}
          <div className="flex gap-2 mb-6 mt-20">
            {[
              "Total Tasks",
              "Completed Tasks",
              "Tasks In Progress",
              "Todos",
            ].map((label, index) => (
              <motion.div
                key={index}
                className="bg-gray-600 p-6 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 + index * 0.2 }}>
                <h2 className="text-xl font-semibold text-red-500">
                  {label}
                </h2>
                <p
                  className={`text-3xl font-bold ${
                    index === 0
                      ? "text-green-200"
                      : index === 1
                      ? "text-green-300"
                      : index === 2
                      ? "text-green-400"
                      : "text-green-500"
                  }`}>
                  <CountUp
                    end={Object.values(taskData)[index]}
                    duration={1.5}
                  />
                </p>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="flex gap-6">
            {/* Task Priority Chart */}
            <motion.div
              className="bg-gray-600 p-4 rounded-lg shadow-md w-full lg:w-1/2 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <h2 className="text-lg font-semibold text-yellow-300 mb-4 text-center">
                Task Priority Chart
              </h2>
              <div className=" text-black w-full h-[350px]">
                <Pie data={priorityChartData} options={chartOptions} />
              </div>
            </motion.div>

            {/* Task Status Chart */}
            <motion.div
              className="bg-gray-600 p-4 rounded-lg shadow-md w-full lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}>
              <h2 className="text-lg font-semibold text-yellow-300 mb-4 text-center">
                Task Status Chart
              </h2>
              <div className="w-full h-[350px]">
                <Bar data={statusChartData} options={chartOptions} />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
