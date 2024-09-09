import { Link } from "react-router-dom";
import {
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineFlag,
  AiOutlineInfoCircle,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineCalendar,
} from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const TaskCard = ({ task, onDelete }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);

  let { _id, title, priority, status, deadlineDate, team } = task;

  // Function to extract initials
  const getInitials = (username) => {
    const names = username.split(" ");
    const initials = names.map((name) => name.charAt(0)).join("");
    return initials.toUpperCase();
  };

  // Determine the icon and color based on priority level
  const getPriorityIcon = () => {
    switch (priority) {
      case "high":
        return {
          icon: (
            <AiOutlineExclamationCircle size={24} className="text-red-500" />
          ),
          color: "bg-red-100",
        };
      case "medium":
        return {
          icon: <AiOutlineInfoCircle size={24} className="text-yellow-500" />,
          color: "bg-yellow-100",
        };
      case "normal":
        return {
          icon: <AiOutlineFlag size={24} className="text-blue-500" />,
          color: "bg-blue-100",
        };
      case "low":
        return {
          icon: <AiOutlineCheckCircle size={24} className="text-green-500" />,
          color: "bg-green-100",
        };
      default:
        return {
          icon: <AiOutlineFlag size={24} className="text-gray-500" />,
          color: "bg-gray-100",
        };
    }
  };

  const { icon, color } = getPriorityIcon();

  // Calculate days left
  const deadline = new Date(deadlineDate);
  const today = new Date();
  const daysLeft = Math.max(
    0,
    Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
  );

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-teal-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="bg-white relative pt-3 relative shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out">
      {/* Priority Icon */}
      <div
        className={`absolute top-[-15px] left-[-15px] w-10 h-10 rounded-full flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

      {/* Task Header */}
      <div className="pl-12">
        <Link to={`/tasks/${_id}`}>
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600">
            {title}
          </h2>
        </Link>
      </div>

      {/* Task Details */}
      <div className="pl-6 mt-4 text-gray-700">
        <div className="flex items-center mb-2">
          <AiOutlineCalendar className="text-red-500 mr-2" />
          <span>Deadline: {new Date(deadlineDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center mb-2">
          <AiOutlineInfoCircle className="text-yellow-500 mr-2" />
          <span>Status: {status}</span>
        </div>

        <div className="flex items-center mb-2">
          <AiOutlineUser className="text-green-700 mr-2" />
          <span>
            Team:{" "}
            {team.length > 0
              ? team.map((member) => member.username).join(", ")
              : "N/A"}
          </span>
        </div>

        {/* Days Left */}
        <div className="flex items-center mt-4 mb-16">
          <AiOutlineClockCircle className="text-gray-500 mr-2" />
          <span>{daysLeft} days left</span>
        </div>

        {/* Team Member Avatars */}
        <div className="flex mt-4 space-x-1 absolute bottom-3">
          {team.slice(0, 4).map((member, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${getRandomColor()}`}
            >
              {getInitials(member.username)}
            </div>
          ))}
          {team.length > 4 && (
            <span className="text-gray-500 flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white">
              +{team.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Delete Button */}
      {role === "admin" && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => onDelete(_id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <AiOutlineDelete size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
