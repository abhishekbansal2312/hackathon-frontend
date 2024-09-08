import React, { useState } from "react";

const CreateTask = ({ onClose }) => {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [status, setStatus] = useState("pending");
  const [assignedDate, setAssignedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [deadlineDate, setDeadlineDate] = useState("");
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      priority,
      status,
      assignedDate,
      deadlineDate,
      team,
    };

    try {
      const response = await fetch("http://localhost:3006/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Task created:", result);
        onClose(); // Close the modal after successful task creation
      } else {
        const errorData = await response.json();
        console.error("Failed to create task:", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
          aria-label="Close">
          &times;
        </button>
        <h1 className="text-2xl font-semibold mb-4">Create New Task</h1>
        {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              aria-required="true"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Assigned Date:</label>
            <input
              type="date"
              value={assignedDate}
              onChange={(e) => setAssignedDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Deadline Date:</label>
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              aria-required="true"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Team:</label>
            <input
              type="text"
              value={team.join(",")}
              onChange={(e) =>
                setTeam(e.target.value.split(",").map((id) => id.trim()))
              }
              placeholder="Comma-separated user IDs"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
