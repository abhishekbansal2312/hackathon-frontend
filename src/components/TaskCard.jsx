// TaskCard.js
import React from 'react';

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
        {/* Status Badge */}
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            task.status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-gray-700 mt-2">{task.description}</p>

      {/* Task Details (optional) */}
      {task.deadlineDate && (
        <p className="text-sm text-gray-500 mt-2">
          Deadline: {new Date(task.deadlineDate).toLocaleDateString()}
        </p>
      )}

      {/* Actions */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
