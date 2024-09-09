import React, { useState, useEffect } from "react";
import {
  Table,
  Spin,
  Alert,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3006/auth/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message || "Error fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setIsAddModalVisible(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    form.setFieldsValue(user);
    setIsEditModalVisible(true);
  };

  const handleOkAdd = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch("http://localhost:3006/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      form.resetFields();
      setIsAddModalVisible(false);
      fetchUsers();
    } catch (error) {
      setError(error.message || "Failed to add user.");
    }
  };

  const handleOkEdit = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(
        `http://localhost:3006/auth/users/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      form.resetFields();
      setIsEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      setError(error.message || "Failed to update user.");
    }
  };

  const handleCancelAdd = () => {
    setIsAddModalVisible(false);
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3006/auth/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      fetchUsers();
    } catch (error) {
      setError(error.message || "Failed to delete user.");
    }
  };

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "User ID", dataIndex: "_id", key: "_id" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="text"
            icon={<EditOutlined className="text-blue-500" />}
            onClick={() => handleEditUser(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            overlayClassName="custom-popconfirm">
            <Button
              type="text"
              icon={<DeleteOutlined className="text-red-500" />}
              danger
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 mt-20">
        <Navbar />
        <div className="mb-4">
          <Button
            type="primary"
            className="add-user-button"
            onClick={handleAddUser}>
            Add User
          </Button>
        </div>
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Alert message={error} type="error" />
        ) : (
          <Table
            dataSource={users}
            columns={columns}
            rowKey="_id"
            pagination={false}
          />
        )}
        <Modal
          title="Add User"
          visible={isAddModalVisible}
          onOk={handleOkAdd}
          onCancel={handleCancelAdd}
          className="add-user-modal"
          footer={[
            <Button
              key="cancel"
              onClick={handleCancelAdd}
              className="text-gray-500">
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleOkAdd}
              className="add-user-button">
              Add User
            </Button>,
          ]}>
          <Form form={form} layout="vertical">
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input the username!" },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email!",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input the password!" },
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}>
              <Select placeholder="Select a role">
                <Option value="admin">Admin</Option>
                <Option value="manager">Manager</Option>
                <Option value="member">Member</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Edit User"
          visible={isEditModalVisible}
          onOk={handleOkEdit}
          onCancel={handleCancelEdit}
          className="add-user-modal"
          footer={[
            <Button
              key="cancel"
              onClick={handleCancelEdit}
              className="text-gray-500">
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleOkEdit}
              className="add-user-button">
              Save Changes
            </Button>,
          ]}>
          <Form form={form} layout="vertical">
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input the username!" },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email!",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input the password!" },
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}>
              <Select placeholder="Select a role">
                <Option value="admin">Admin</Option>
                <Option value="manager">Manager</Option>
                <Option value="member">Member</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </div>
  );
};

export default Users;
