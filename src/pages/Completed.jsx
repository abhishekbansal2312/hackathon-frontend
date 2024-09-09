import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineFlag,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { ThemeContext } from "../context/ThemeContext";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Completed = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  // Use ThemeContext to get the theme
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3006/task/tasks", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        setTasks(data);
      } else {
        const text = await response.text();
        console.error("Response is not JSON:", text);
        setError("Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:3006/task/delete/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } else {
        setError("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Error deleting task.");
    }
  };

  const PriorityDisplay = ({ priority }) => {
    const getPriorityIcon = () => {
      switch (priority) {
        case "high":
          return (
            <AiOutlineExclamationCircle size={20} className="text-red-500" />
          );
        case "medium":
          return <AiOutlineInfoCircle size={20} className="text-yellow-500" />;
        case "normal":
          return <AiOutlineFlag size={20} className="text-blue-500" />;
        case "low":
          return <AiOutlineCheckCircle size={20} className="text-green-500" />;
        default:
          return <AiOutlineFlag size={20} className="text-gray-500" />;
      }
    };

    const getPriorityColor = () => {
      switch (priority) {
        case "high":
          return "bg-red-100";
        case "medium":
          return "bg-yellow-100";
        case "normal":
          return "bg-blue-100";
        case "low":
          return "bg-green-100";
        default:
          return "bg-gray-100";
      }
    };

    return (
      <span
        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor()}`}>
        {getPriorityIcon()}
        <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
      </span>
    );
  };

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}>
      <Sidebar />
      <main className="flex-1 p-6 text-black">
        <Navbar />
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-fadeIn">
          Completed Tasks
        </h2>
        <div className="flex items-center space-x-4 mb-8">
          <PriorityDisplay priority="high" />
          <PriorityDisplay priority="medium" />
          <PriorityDisplay priority="normal" />
          <PriorityDisplay priority="low" />
        </div>

        {loading ? (
          <p className="text-lg">Loading tasks...</p>
        ) : error ? (
          <p className="text-red-600 text-lg">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.some((task) => task.status === "completed") ? (
                tasks
                  .filter((task) => task.status === "completed") // Filter tasks by "completed" status
                  .map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onDelete={handleDeleteTask}
                    />
                  ))
              ) : (
                <p className="text-lg">No tasks completed yet.</p>
              )
            ) : (
              <p className="text-lg">No tasks available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Completed;
