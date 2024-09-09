import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaFlag, FaCheck, FaExclamationTriangle, FaBug } from "react-icons/fa";
import { motion } from "framer-motion";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    type: "assigned",
    activity: "",
    date: new Date().toISOString().split("T")[0], // Default date to today
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3006/task/task/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task details:", error);
        setError("Error fetching task details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3006/task/task/${id}/add-activity`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newActivity),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedResponse = await fetch(
        `http://localhost:3006/task/task/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!updatedResponse.ok) {
        throw new Error(`HTTP error! Status: ${updatedResponse.status}`);
      }

      const updatedTask = await updatedResponse.json();
      setTask(updatedTask);
      setNewActivity({ type: "assigned", activity: "", date: new Date().toISOString().split("T")[0] });
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding activity:", error);
      setError("Failed to add activity.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800">{task.title}</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Activity
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Task Details</h2>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Date Created:</strong> {new Date(task.date).toLocaleDateString()}</p>
        <p><strong>Assigned Date:</strong> {new Date(task.assignedDate).toLocaleDateString()}</p>
        <p><strong>Deadline:</strong> {new Date(task.deadlineDate).toLocaleDateString()}</p>
        <p><strong>Team:</strong> {task.team.join(", ")}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Activities</h2>
        <VerticalTimeline>
          {task.activities.map((activity, index) => (
            <VerticalTimelineElement
              key={index}
              date={new Date(activity.date).toLocaleDateString()}
              icon={getActivityIcon(activity.type)}
              iconStyle={getIconStyle(activity.type)}
              contentStyle={{ background: "#fff", color: "#000" }}
              contentArrowStyle={{ borderRight: "7px solid #fff" }}
              className="timeline-element"
            >
              <h3 className="text-lg font-semibold">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </h3>
              <p>{activity.activity}</p>
              <p className="text-gray-600">By User: {activity.by}</p>
              
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-2xl font-semibold mb-4">Add New Activity</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="type" className="mb-1 font-medium">Type</label>
                <select
                  id="type"
                  name="type"
                  value={newActivity.type}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2"
                  required
                >
                  <option value="assigned">Assigned</option>
                  <option value="started">Started</option>
                  <option value="in progress">In Progress</option>
                  <option value="bug">Bug</option>
                  <option value="completed">Completed</option>
                  <option value="commented">Commented</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="activity" className="mb-1 font-medium">Activity</label>
                <textarea
                  id="activity"
                  name="activity"
                  value={newActivity.activity}
                  onChange={handleChange}
                  rows="4"
                  className="border border-gray-300 rounded p-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="date" className="mb-1 font-medium">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newActivity.date}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Activity
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const getActivityIcon = (type) => {
  switch (type) {
    case "bug":
      return <FaBug />;
    case "completed":
      return <FaCheck />;
    case "assigned":
    case "started":
    case "in progress":
      return <FaFlag />;
    default:
      return <FaFlag />;
  }
};

const getIconStyle = (type) => {
  switch (type) {
    case "bug":
      return { background: "red", color: "#fff" };
    case "completed":
      return { background: "green", color: "#fff" };
    case "assigned":
    case "started":
    case "in progress":
      return { background: "#007bff", color: "#fff" };
    default:
      return { background: "#007bff", color: "#fff" };
  }
};

export default TaskDetails;
