import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">NHK</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
}

export default Navbar;
