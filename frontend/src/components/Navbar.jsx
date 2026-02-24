import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/dashboard">
          Task Manager
        </Link>

        <button
          className="btn btn-sm btn-outline-light"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
