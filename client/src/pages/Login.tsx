// import axios from "axios";
import api from "../util/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    api
      .post("/users/login", body)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          setErrMsg(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <h1 className="text-center text-2xl my-4">Login</h1>
      <p className={errMsg ? "text-center text-red-500" : "hidden"}>{errMsg}</p>
      <div id="formWrapper" className="flex justify-center mt-4">
        <div
          id="formContainer"
          className="w-64 py-4 px-4 bg-gray-300 rounded-md"
        >
          <form onSubmit={submitHandler} className="flex flex-wrap gap-4">
            <div id="usernameContainer">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                className="mt-2 w-56 rounded-sm"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div id="passwordContainer" className="mt-2">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-2 w-56 rounded-sm"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="mx-auto mt-4 bg-cyan-800 text-white px-4 py-2 rounded-md"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
