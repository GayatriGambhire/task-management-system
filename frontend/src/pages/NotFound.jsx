import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/" className="btn btn-primary btn-sm">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
