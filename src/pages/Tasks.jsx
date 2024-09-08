import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3006/task/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:3006/task/delete/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      }
    } catch (error) {
      console.error("Error deleting task:", error);
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
      </main>
    </div>
  );
};

export default Tasks;
