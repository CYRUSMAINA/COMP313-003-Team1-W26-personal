import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="nav-links">
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/subjects">Subjects</Link>
            <Link to="/classes">Classes</Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login"; // simple redirect
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;