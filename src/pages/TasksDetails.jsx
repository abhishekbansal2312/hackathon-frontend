import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";

const TaskDetails = () => {
  const tasks = [
    { title: "Task 1", details: "Details for Task 1" },
    { title: "Task 2", details: "Details for Task 2" },
    // Add more tasks
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Navbar />
        <h1 className="text-2xl font-bold">Task Details</h1>
        <div>
          {tasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TaskDetails;
