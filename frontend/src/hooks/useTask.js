import { useState, useEffect } from "react";
import API from "../api/axiosConfig";

const useTasks = (userId) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get(`/tasks/?user_id=${userId}`);
    setTasks(res.data);
  };

  const createTask = async (data) => {
    await API.post("/tasks/create/", data);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/delete/${id}/`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, createTask, deleteTask };
};

export default useTasks;
