import { useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn Django", status: "Pending" },
    { id: 2, title: "Build React UI", status: "Completed" },
  ]);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title,
      status,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setStatus("Pending");

    document.getElementById("closeModal").click();
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">Tasks</h2>

        <button
          className="btn btn-primary mb-3"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
        >
          Add Task
        </button>

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Modal */}
      <div className="modal fade" id="addTaskModal">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Add New Task</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="closeModal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddTask}
              >
                Save Task
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
