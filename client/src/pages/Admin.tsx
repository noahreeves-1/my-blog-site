import api from "../util/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [admin_code, setAdminCode] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");

  const navigate = useNavigate();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSuccessMsg("");
    setFailureMsg("");

    const body = {
      admin_code,
    };

    api
      .post("/admin", body, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setSuccessMsg(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setFailureMsg(err.response.data.message);
      });
  }

  return (
    <section>
      <p className={successMsg ? "text-green-600 text-center mt-4" : "hidden"}>
        {successMsg}
      </p>
      <p className={failureMsg ? "text-red-500 text-center mt-4" : "hidden"}>
        {failureMsg}
      </p>
      <div className="bg-cyan-800 w-fit mx-auto mt-4 py-4 px-8 rounded-md">
        <h1 className="text-center my-4 text-2xl text-gray-100">Admin Page</h1>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col items-center my-4 bg-cyan-800">
            <label htmlFor="admin_code"></label>
            <input
              type="text"
              id="admin_code"
              name="admin_code"
              required
              className="text-gray-800"
              onChange={(e) => setAdminCode(e.target.value)}
            />
            <button className="py-4 px-8 bg-teal-700 mt-4 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Admin;
