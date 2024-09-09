// import React from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import TaskItem from "../components/TaskItem";

// const TaskDetails = () => {
//   const tasks = [
//     { title: "Task 1", details: "Details for Task 1" },
//     { title: "Task 2", details: "Details for Task 2" },
//     // Add more tasks
//   ];

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 p-4">
//         <Navbar />
//         <h1 className="text-2xl font-bold">Task Details</h1>
//         <div>
//           {tasks.map((task, index) => (
//             <TaskItem key={index} task={task} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TaskDetails;





import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the specific task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3006/task/task/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setTask(data);
        } else {
          const text = await response.text();
          console.error("Response is not JSON:", text);
          setError("Failed to fetch task details.");
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
        setError("Error fetching task details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Date Created:</strong> {new Date(task.date).toLocaleDateString()}</p>
      <p><strong>Assigned Date:</strong> {new Date(task.assignedDate).toLocaleDateString()}</p>
      <p><strong>Deadline:</strong> {new Date(task.deadlineDate).toLocaleDateString()}</p>
      <p><strong>Team:</strong> {task.team.join(", ")}</p>
      
    </div>
  );
};

export default TaskDetails;
