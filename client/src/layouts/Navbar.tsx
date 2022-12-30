import { Link } from "react-router-dom";

function Navbar() {
  return (
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
          <Link to="/refresh">Refresh</Link>
          <Link to="/users/signup">Sign Up</Link>
          <Link to="/admin/posts/create">Create Post</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
