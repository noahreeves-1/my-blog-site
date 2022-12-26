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

import "./App.css";

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
    <>
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

          {posts.map((post) => (
            <Route
              path={`/posts/${post._id}`}
              key={post._id}
              element={<Post {...post} posts={posts} setPosts={setPosts} />}
            ></Route>
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
