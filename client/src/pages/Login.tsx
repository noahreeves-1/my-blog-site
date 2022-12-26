// import axios from "axios";
import api from "../util/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const body = {
    username,
    password,
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post("/users/login", body)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="text-center text-2xl my-4">Login</div>
      <div id="formWrapper" className="flex justify-center mt-4">
        <div
          id="formContainer"
          className="w-64 py-4 px-4 bg-gray-300 rounded-md"
        >
          <form
            method="POST"
            action="http://localhost:3001/users/login"
            onSubmit={submitHandler}
            className="flex flex-wrap gap-4"
          >
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
