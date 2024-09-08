import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks.jsx";
import TasksDetails from "./pages/TasksDetails.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/ContactUs";
import Users from "./pages/Users";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TasksDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />\
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
