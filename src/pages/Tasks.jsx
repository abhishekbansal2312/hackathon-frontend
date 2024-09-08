import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";
// import { Link } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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
          // Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });

      const contentType = response.headers.get("content-type");

      
        const data = await response.json();
        console.log("data is", data);
        if(data){
          setTasks(data);
        }
       else {
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Navbar />
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-fadeIn">
          Task Dashboard
        </h2>
        {/* Add a new task */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={openAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            Add Task
          </button>
        </div>
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
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
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
