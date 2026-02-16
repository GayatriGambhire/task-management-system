import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5>Total Tasks</h5>
              <h3>10</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5>Completed</h5>
              <h3>6</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5>Pending</h5>
              <h3>4</h3>
            </div>
          </div>
        </div>
      </div>

      <Link to="/tasks" className="btn btn-dark mt-3">
        View Tasks
      </Link>
    </div>
  );
}

export default Dashboard;
