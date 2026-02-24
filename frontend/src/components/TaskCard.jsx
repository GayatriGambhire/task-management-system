function TaskCard({ task, onDelete, onComplete }) {
  return (
    <div className="card p-3 mb-3 shadow-sm">

      <h6 className="fw-bold">{task.title}</h6>

      <p className="text-muted mb-1">
        {task.description}
      </p>

      <small className="text-secondary d-block">
        Due: {task.due_date || "Not Set"}
      </small>

      {task.completed_at && (
        <small className="text-success d-block">
          Completed On: {new Date(task.completed_at).toLocaleDateString()}
        </small>
      )}

      <div className="mt-2 d-flex justify-content-between align-items-center">
        <span
          className={`badge ${
            task.status === "Completed"
              ? "bg-success"
              : "bg-warning text-dark"
          }`}
        >
          {task.status}
        </span>

        <div>
          {task.status !== "Completed" && (
            <button
              className="btn btn-outline-success btn-sm me-2"
              onClick={() => onComplete(task)}
            >
              Complete
            </button>
          )}

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
}

export default TaskCard;
