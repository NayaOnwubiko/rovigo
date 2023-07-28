import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  // Change the active window when the user scrolls down
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // Get the current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    // Display the navbar class depending on if it's active or not
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">rovigo</span>
          </Link>
        </div>
        <div className="links">
          <span>Trips</span>
          <span>Sign Up</span>
          <span>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
