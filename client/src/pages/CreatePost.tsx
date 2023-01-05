import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../util/axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      title,
      content,
    };

    api
      .post("/admin/posts/create", body, { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section>
      <h1 className="py-4 text-2xl text-center text-gray-800">Create Post</h1>
      <div
        id="formContainer"
        className="mx-auto w-fit mt-4 p-4 bg-gray-400 rounded-md text-gray-800"
      >
        <form onSubmit={submitHandler} className="flex flex-col text-center">
          <div id="titleContainer" className="text-start pt-4">
            <label htmlFor="title" className="block font-bold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              className="mt-2"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div id="contentContainer" className="text-start pt-4">
            <label htmlFor="content" className="block font-bold">
              Content:
            </label>
            <textarea
              name="content"
              id="content"
              cols={50}
              rows={6}
              required
              className="mt-2"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button className="mx-auto w-28 py-4 mt-4 rounded-md bg-cyan-800 text-white">
            Create Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostCreate;
