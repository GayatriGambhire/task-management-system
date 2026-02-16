import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Task Manager
        </Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/dashboard">
            Dashboard
          </Link>
          <Link className="btn btn-outline-light me-2" to="/tasks">
            Tasks
          </Link>
          <Link className="btn btn-danger" to="/">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
