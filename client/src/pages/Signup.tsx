// import axios from "axios";
// import { redirect } from "react-router-dom";

import api from "../util/axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const SIGNUP_URL = "/users/signup";

function Signup(): JSX.Element {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  // const [validEmail, setValidEmail] = useState(false);
  // const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [passwordFocus, setPwdFocus] = useState(false);

  const [confirm_password, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(firstName);
    console.log(result);
    console.log(firstName);
    setValidFirstName(result);
  }, [firstName]);

  useEffect(() => {
    const result = USER_REGEX.test(lastName);
    console.log(result);
    console.log(lastName);
    setValidLastName(result);
  }, [lastName]);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    console.log(result);
    console.log(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPwd(result);
    const match = password === confirm_password;
    setValidMatch(match);
  }, [password, confirm_password]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, username, password, confirm_password]);

  // ! Dave Gray YouTube - React JS Form Validation | Axios User Registration Form Submit | Beginners to Intermediate
  // const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const body = {
  //       first_name: firstName,
  //       last_name: lastName,
  //       username,
  //       email,
  //       password: password,
  //     };

  //     const response = await api.post(SIGNUP_URL, body);
  //     console.log(response.data);

  //     navigate("/");
  //   } catch (err: unknown) {
  //     console.log("Registration Failed");
  //   }
  // };

  //! which one??
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
      confirm_password,
    };

    console.log(password);
    try {
      const response = await api.post("/users/signup", body);
      navigate("/");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-center text-2xl my-4">Create Account</h1>
      <div id="formWrapper" className="flex justify-center mt-4">
        <div
          id="formContainer"
          className="w-64 py-4 px-4 bg-gray-300 rounded-md"
        >
          <form className="flex flex-wrap gap-4" onSubmit={submitHandler}>
            <div id="firstNameContainer">
              <label htmlFor="first_name">First Name: </label>
              <input
                type="text"
                id="first_name"
                ref={userRef}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="off"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="fnnote"
                name="first_name"
                placeholder="John"
                minLength={2}
                className="w-56 rounded-md"
              />
              <p
                id="fnnote"
                className={
                  firstNameFocus && firstName && !validFirstName
                    ? "text-red-500 text-sm"
                    : "hidden"
                }
              >
                2 to 24 characters. <br />
                Must begin with a letter <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div id="lastNameContainer">
              <label htmlFor="last_name">Last Name: </label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                placeholder="Smith"
                required
                minLength={2}
                className="w-56 rounded-md"
                onChange={(e) => setLastName(e.target.value)}
                ref={userRef}
                autoComplete="off"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="uidnote"
              />
              <p
                id="fnnote"
                className={
                  lastNameFocus && lastName && !validLastName
                    ? "text-red-500 text-sm"
                    : "hidden"
                }
              >
                2 to 24 characters. <br />
                Must begin with a letter <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div id="emailContainer">
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="mail@email.com"
                required
                minLength={2}
                className="w-56 rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div id="usernameContainer">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="someUsername"
                required
                minLength={3}
                className="w-56 rounded-sm"
                onChange={(e) => setUsername(e.target.value)}
                ref={userRef}
                autoComplete="off"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                aria-invalid={validUsername ? "false" : "true"}
                aria-describedby="uidnote"
              />
              <p
                id="uidnote"
                className={
                  usernameFocus && username && !validUsername
                    ? "text-red-500 text-sm"
                    : "hidden"
                }
              >
                2 to 24 characters. <br />
                Must begin with a letter <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div id="passwordContainer">
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                minLength={8}
                // value={password}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="passwordnote"
              />
              <p
                id="passwordnote"
                className={
                  passwordFocus && !validPwd ? "text-red-500 text-sm" : "hidden"
                }
              >
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters, a number, and a
                special character <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
            </div>
            <div id="confirmPasswordContainer">
              <label htmlFor="confirm_password">Confirm Password: </label>
              <input
                id="confirm_password"
                type="password"
                name="confirm_password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="matchnote"
              />
              <p
                id="matchnote"
                className={
                  matchFocus && !validMatch ? "text-red-500 text-sm" : "hidden"
                }
              >
                Must match the first password input field.
              </p>
            </div>
            <button
              disabled={
                !validFirstName ||
                !validLastName ||
                !validMatch ||
                !validUsername ||
                !validPwd
                  ? true
                  : false
              }
              className={
                !validFirstName ||
                !validLastName ||
                !validMatch ||
                !validUsername ||
                !validPwd
                  ? "mx-auto px-4 py-2 bg-slate-200 rounded-md text-white"
                  : "mx-auto bg-cyan-800 text-white px-4 py-2 rounded-md"
              }
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
