// * Downloaded libraries
import { Routes, Route } from "react-router-dom";

// * Layouts
import Navbar from "./layouts/Navbar";
import { Layout } from "./layouts/Layout";

// * Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import Admin from "./pages/Admin";
import Refresh from "./pages/Refresh";
import { Missing } from "./components/Missing";
import { CreateRole } from "./pages/CreateRole";

// * Components
import { RequireAuth } from "./components/RequireAuth";

import "./App.css";
import PostCreate from "./pages/CreatePost";
import { Logout } from "./pages/Logout";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/refresh" element={<Refresh />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/posts/create" element={<PostCreate />} />
            <Route path="/admin/create_role" element={<CreateRole />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
