import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineFlag,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import Cookies from "js-cookie";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve the token from cookies
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token to get the role
      setRole(decodedToken.role); // Set the role in the state
    }
  }, []);

  // Open add task modal
  const openAddTask = () => {
    setIsAddTaskOpen(true);
  };

  // Close add task modal
  const closeAddTask = () => {
    setIsAddTaskOpen(false);
  };

  // Fetch tasks from API
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
      console.log("data is", data);
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
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  // Handle delete task
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

  // Priority Icon and Label
  const PriorityDisplay = ({ priority }) => {
    const getPriorityIcon = () => {
      switch (priority) {
        case "high":
          return (
            <AiOutlineExclamationCircle size={24} className="text-red-500" />
          );
        case "medium":
          return <AiOutlineInfoCircle size={24} className="text-yellow-500" />;
        case "normal":
          return <AiOutlineFlag size={24} className="text-blue-500" />;
        case "low":
          return <AiOutlineCheckCircle size={24} className="text-green-500" />;
        default:
          return <AiOutlineFlag size={24} className="text-gray-500" />;
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
        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor()}`}
      >
        {getPriorityIcon()}
        <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
      </span>
    );
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Navbar />
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-fadeIn">
          Task Dashboard
        </h2>
        {/* priority */}
        {role !== "admin" && (
          <div className="flex items-center space-x-4 mb-8">
            <PriorityDisplay priority="high" />
            <PriorityDisplay priority="medium" />
            <PriorityDisplay priority="normal" />
            <PriorityDisplay priority="low" />
          </div>
        )}
        {/* Add a new task */}
        {role === "admin" && (
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={openAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            >
              Add Task
            </button>
            <PriorityDisplay priority="high" />
            <PriorityDisplay priority="medium" />
            <PriorityDisplay priority="normal" />
            <PriorityDisplay priority="low" />
          </div>
        )}
        {/* Show loading spinner if loading */}
        {loading ? (
          <p className="text-gray-600 text-lg">Loading tasks...</p>
        ) : error ? (
          <p className="text-red-600 text-lg">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p className="text-gray-600 text-lg">No tasks available.</p>
            )}
          </div>
        )}
        {/* CreateTask modal */}
        {isAddTaskOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <CreateTask onClose={closeAddTask} />
              <button
                onClick={closeAddTask}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Tasks;
