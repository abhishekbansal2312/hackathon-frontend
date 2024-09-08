// src/pages/Users.js

import React, { useState, useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3006/auth/users", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError("Error fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "User ID", dataIndex: "_id", key: "_id" },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Navbar />
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Users List
        </h2>
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Alert message={error} type="error" />
        ) : (
          <Table dataSource={users} columns={columns} rowKey="_id" />
        )}
      </main>
    </div>
  );
};

export default Users;
