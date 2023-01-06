import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";

function Navbar() {
  const { auth } = useAuthContext();

  return auth?.roles?.includes("2001") ? (
    auth?.roles.includes("5454") ? (
      // * ADMIN
      <nav className="mx-auto py-2 px-4 bg-slate-800 text-white">
        <div
          id="navBarContainer"
          className="mx-auto max-w-xl flex justify-between"
        >
          <Link to="/" className="font-bold">
            NHK
          </Link>
          <div className="flex gap-4">
            <Link to="/logout">Log Out</Link>
            <Link to="/refresh">Refresh</Link>
            <Link to="/admin/posts/create">Create Post</Link>
            <Link to="/admin/create_role">Create Role</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </nav>
    ) : (
      // * USER ONLY
      <nav className="mx-auto py-2 px-4 bg-slate-800 text-white">
        <div
          id="navBarContainer"
          className="mx-auto max-w-xl flex justify-between"
        >
          <Link to="/" className="font-bold">
            NHK
          </Link>
          <div className="flex gap-4">
            <Link to="/logout">Log Out</Link>
            <Link to="/refresh">Refresh</Link>
            <Link to="/admin">Become Admin</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </nav>
    )
  ) : (
    // * NO USER
    <nav className="mx-auto py-2 px-4 bg-slate-800 text-white">
      <div
        id="navBarContainer"
        className="mx-auto max-w-xl flex justify-between"
      >
        <Link to="/" className="font-bold">
          NHK
        </Link>
        <div className="flex gap-4">
          <Link to="/users/login">Login</Link>
          <Link to="/users/signup">Sign Up</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
