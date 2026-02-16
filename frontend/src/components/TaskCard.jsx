function TaskCard({ task }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between">
        <div>
          <h5>{task.title}</h5>
          <span
            className={
              task.status === "Completed"
                ? "badge bg-success"
                : "badge bg-warning"
            }
          >
            {task.status}
          </span>
        </div>

        <div>
          <button className="btn btn-sm btn-outline-primary me-2">
            Edit
          </button>
          <button className="btn btn-sm btn-outline-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
