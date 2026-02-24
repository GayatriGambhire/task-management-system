import { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";

function TaskSection() {
  const user_id = localStorage.getItem("user_id");

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: ""
  });

  const API_BASE = "http://127.0.0.1:8000/api/tasks";

  const fetchTasks = async () => {
    const response = await axios.get(
      `${API_BASE}/?user_id=${user_id}`
    );
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTask = async () => {
    if (!form.title) return;

    await axios.post(`${API_BASE}/create/`, {
      ...form,
      status: "Pending",
      user_id
    });

    setForm({
      title: "",
      description: "",
      due_date: ""
    });

    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE}/delete/${id}/`);
    fetchTasks();
  };

  const handleComplete = async (task) => {
    await axios.put(`${API_BASE}/update/${task._id}/`, {
      ...task,
      status: "Completed"
    });

    fetchTasks();
  };

  return (
    <div>

      {/* Add Task */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">Add New Task</h5>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          className="form-control mb-2"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="due_date"
          className="form-control mb-3"
          value={form.due_date}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary btn-sm"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={handleDelete}
          onComplete={handleComplete}
        />
      ))}

    </div>
  );
}

export default TaskSection;
