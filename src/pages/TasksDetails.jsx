import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaFlag } from "react-icons/fa";
import { motion } from "framer-motion";

const TaskDetails = () => {
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    type: "assigned",
    activity: "",
    date: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  // Fetch the specific task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3006/task/task/${id}`, {
          method: "GET",
          credentials: "include", // Include credentials such as cookies
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
          credentials: "include", // Include credentials such as cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newActivity),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh the task details after adding activity
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
      setNewActivity({ type: "assigned", activity: "", date: "" });
      setShowPopup(false); // Close the popup
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
    <div className="container mx-auto p-4">
      {/* Add Activity Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Activity
        </button>
      </div>

      {/* Task Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <p>
            <strong>Date Created:</strong>{" "}
            {new Date(task.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Assigned Date:</strong>{" "}
            {new Date(task.assignedDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(task.deadlineDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Team:</strong> {task.team.join(", ")}
          </p>
        </motion.div>
      </div>

      {/* Activities Timeline */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Activities</h2>
        <VerticalTimeline>
          {task.activities.map((activity, index) => (
            <VerticalTimelineElement
              key={index}
              date={new Date(activity.date).toLocaleDateString()}
              icon={<FaFlag />}
              className="timeline-element"
              contentStyle={{ background: "#fff", color: "#000" }}
              contentArrowStyle={{ borderRight: "7px solid #fff" }}
              iconStyle={{ background: "#3498db", color: "#fff" }}
              position="left" // Ensures all activities are on the left
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

      {/* Popup for Adding Activity */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Add New Activity</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="type" className="mb-1 font-medium">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newActivity.type}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2">
                  <option value="assigned">Assigned</option>
                  <option value="started">Started</option>
                  <option value="in progress">In Progress</option>
                  <option value="bug">Bug</option>
                  <option value="completed">Completed</option>
                  <option value="commented">Commented</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="activity" className="mb-1 font-medium">
                  Activity
                </label>
                <textarea
                  id="activity"
                  name="activity"
                  value={newActivity.activity}
                  onChange={handleChange}
                  rows="4"
                  className="border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="date" className="mb-1 font-medium">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newActivity.date}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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

export default TaskDetails;
