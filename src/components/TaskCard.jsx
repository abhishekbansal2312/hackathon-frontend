// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaCalendarAlt,
//   FaFlag,
//   FaUser,
//   FaTrash,
//   FaClock,
// } from "react-icons/fa";

// const TaskCard = ({task, onDelete }) => {
//   const {
//     _id,
//     title,
//     date,
//     priority,
//     status,
//     assignedDate,
//     deadlineDate,
//     team,
//   } = task;

//   const url1 = `/tasks/${_id}`;
//   // console.log(url1);

//   return (
//     <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out">
//       {/* Task Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold text-gray-900"><Link to={url1}>{title}</Link></h2>
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-semibold ${
//             priority === "high"
//               ? "bg-red-100 text-red-700"
//               : priority === "normal"
//               ? "bg-yellow-100 text-yellow-700"
//               : "bg-green-100 text-green-700"
//           }`}>
//           {priority}
//         </span>
//       </div>

//       {/* Task Details Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//         {/* Date Created */}
//         <div className="flex items-center space-x-2">
//           <FaCalendarAlt className="text-blue-500" />
//           <span>
//             <strong>Date Created:</strong> {new Date(date).toLocaleDateString()}
//           </span>
//         </div>

//         {/* Status */}
//         <div className="flex items-center space-x-2">
//           <FaFlag className="text-yellow-500" />
//           <span>
//             <strong>Status:</strong> {status}
//           </span>
//         </div>

//         {/* Assigned Date */}
//         <div className="flex items-center space-x-2">
//           <FaClock className="text-purple-500" />
//           <span>
//             <strong>Assigned Date:</strong>{" "}
//             {new Date(assignedDate).toLocaleDateString()}
//           </span>
//         </div>

//         {/* Deadline Date */}
//         <div className="flex items-center space-x-2">
//           <FaClock className="text-red-500" />
//           <span>
//             <strong>Deadline Date:</strong>{" "}
//             {new Date(deadlineDate).toLocaleDateString()}
//           </span>
//         </div>

//         {/* Team */}
//         <div className="flex items-center space-x-2 col-span-2">
//           <FaUser className="text-green-500" />
//           <span>
//             <strong>Team:</strong> {team.length > 0 ? team.join(", ") : "N/A"}
//           </span>
//         </div>
//       </div>

//       {/* Delete Button */}
//       <div className="flex justify-end mt-6">
//         <button
//           onClick={() => onDelete(_id)}
//           className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200">
//           <FaTrash />
//           <span>Delete</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;





import { Link } from "react-router-dom";
import { FaCalendarAlt, FaExclamationCircle, FaExclamationTriangle, FaCheckCircle, FaFlag, FaUser, FaTrash, FaClock } from "react-icons/fa";

const TaskCard = ({ task, onDelete }) => {
<<<<<<< HEAD
  const { _id, title, priority, status, deadlineDate, team } = task;

  const url1 = `/tasks/${_id}`;

  // Determine the icon and color based on priority level
  const getPriorityIcon = () => {
    switch (priority) {
      case "high":
        return { icon: <FaExclamationCircle size={24} className="glow text-red-500" />, color: "text-red-500" };
      case "medium":
        return { icon: <FaExclamationTriangle size={24} className="glow text-yellow-500" />, color: "text-yellow-500" };
      case "normal":
        return { icon: <FaFlag size={24} className="glow text-blue-500" />, color: "text-blue-500" };
      case "low":
        return { icon: <FaCheckCircle size={24} className="glow text-green-500" />, color: "text-green-500" };
      default:
        return { icon: <FaFlag size={24} className="glow text-gray-500" />, color: "text-gray-500" };
    }
  };

  const { icon, color } = getPriorityIcon();

  // Calculate days left
  const deadline = new Date(deadlineDate);
  const today = new Date();
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

=======
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

>>>>>>> 102c1814c57cc1f786b5e0cf4821fcc20a14a234
  return (
    <div className="bg-white relative p-6 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out">
      {/* Flag Icon (larger size, centered in its circle) */}
      <div
        className={`absolute top-[-15px] left-[-15px] w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

      {/* Task Header */}
<<<<<<< HEAD
      <div className="pl-8">
        <h2 className="text-lg font-semibold text-gray-900">
          <Link to={url1}>{title}</Link>
        </h2>
=======
      <div className="flex items-center justify-between mb-4">
        <Link to={`/tasks/${_id}`}>
          <h2 className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600">
            {title}
          </h2>
        </Link>
>>>>>>> 102c1814c57cc1f786b5e0cf4821fcc20a14a234
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            priority === "high"
              ? "bg-red-100 text-red-700"
              : priority === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : priority === "normal"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>

      {/* Task Details */}
      <div className="pl-8 mt-4 text-gray-700">
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="text-red-500 mr-2" />
          <span>Deadline: {new Date(deadlineDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center mb-2">
          <FaFlag className="text-yellow-500 mr-2" />
          <span>Status: {status}</span>
        </div>

        <div className="flex items-center mb-2">
          <FaUser className="text-green-500 mr-2" />
          <span>Team: {team.length > 0 ? team.join(", ") : "N/A"}</span>
        </div>

        {/* Days Left Line */}
        <div className="flex items-center mt-4">
          <FaClock className="text-gray-500 mr-2" />
          <span>{daysLeft} days left</span>
        </div>

        {/* Team Member Avatars */}
        <div className="flex mt-4 space-x-2">
          {team.slice(0, 4).map((member, index) => (
            <div key={index} className="w-8 h-8 rounded-full bg-gray-300" />
          ))}
          {team.length > 4 && <span className="text-gray-500">+{team.length - 4}</span>}
        </div>
      </div>

      {/* Delete Button (only icon, no circle) */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => onDelete(_id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
