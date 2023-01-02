// * Downloaded libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import api from "./util/axios";

// * Layouts
import Navbar from "./layouts/Navbar";

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

import "./App.css";
import PostCreate from "./pages/CreatePost";

function App() {
  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    api
      .get("/")
      .then((res: AxiosResponse<any, any>) => {
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(posts);

  return (
    <main>
      <Router>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users/login" element={<Login />}></Route>
          <Route path="/users/signup" element={<Signup />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/posts/:id" element={<Post />}></Route>
          <Route path="/refresh" element={<Refresh />}></Route>

          {/* Protected Routes */}
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/admin/posts/create" element={<PostCreate />}></Route>
          <Route path="*" element={<Missing />}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
