import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaFlag,
  FaUser,
  FaTrash,
  FaClock,
} from "react-icons/fa";

const TaskCard = ({task, onDelete }) => {
  const {
    _id,
    title,
    date,
    priority,
    status,
    assignedDate,
    deadlineDate,
    team,
  } = task;

  const url1 = `/tasks/${_id}`;
  // console.log(url1);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out">
      {/* Task Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900"><Link to={url1}>{title}</Link></h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            priority === "high"
              ? "bg-red-100 text-red-700"
              : priority === "normal"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}>
          {priority}
        </span>
      </div>

      {/* Task Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        {/* Date Created */}
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-blue-500" />
          <span>
            <strong>Date Created:</strong> {new Date(date).toLocaleDateString()}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2">
          <FaFlag className="text-yellow-500" />
          <span>
            <strong>Status:</strong> {status}
          </span>
        </div>

        {/* Assigned Date */}
        <div className="flex items-center space-x-2">
          <FaClock className="text-purple-500" />
          <span>
            <strong>Assigned Date:</strong>{" "}
            {new Date(assignedDate).toLocaleDateString()}
          </span>
        </div>

        {/* Deadline Date */}
        <div className="flex items-center space-x-2">
          <FaClock className="text-red-500" />
          <span>
            <strong>Deadline Date:</strong>{" "}
            {new Date(deadlineDate).toLocaleDateString()}
          </span>
        </div>

        {/* Team */}
        <div className="flex items-center space-x-2 col-span-2">
          <FaUser className="text-green-500" />
          <span>
            <strong>Team:</strong> {team.length > 0 ? team.join(", ") : "N/A"}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => onDelete(_id)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200">
          <FaTrash />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
