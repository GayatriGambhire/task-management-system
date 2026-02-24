import Navbar from "../components/Navbar";
import TaskSection from "../components/TaskSection";

function Dashboard() {
  const name = localStorage.getItem("name");

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* Dashboard Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1">Dashboard</h3>
            <p className="text-muted mb-0">
              Welcome back,{" "}
              <span className="text-primary fw-semibold">
                {name}
              </span>
            </p>
          </div>

          {/* Optional Date Display */}
          <div className="text-muted small">
            {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Task Section */}
        <TaskSection />

      </div>
    </>
  );
}

export default Dashboard;
