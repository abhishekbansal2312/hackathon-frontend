// Tasks.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await fetch('/task/tasks'); // Make sure to match your API route
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`/task/delete/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle edit task
  const handleEditTask = (task) => {
    // Implement the edit logic (e.g., open a modal with task data for editing)
    console.log('Edit Task:', task);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <div>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Tasks;
