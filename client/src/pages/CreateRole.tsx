import { useState } from "react";
import api from "../util/axios";

export const CreateRole = () => {
  const [role_name, setRoleName] = useState("");
  const [role_id, setRoleId] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccessMsg("");
    setFailureMsg("");

    const body = {
      role_name,
      role_id,
    };

    api
      .post("/admin/create_role", body, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setSuccessMsg(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        setFailureMsg(err.response.data.message);
      });
  };
  return (
    <section>
      <p className={successMsg ? "text-green-700 font-bold mt-4" : "hidden"}>
        {successMsg}
      </p>
      <p className={failureMsg ? "text-red-500 font-bold mt-4" : "hidden"}>
        {failureMsg}
      </p>
      <div id="formContainer" className="w-fit p-4 mx-auto mt-4 bg-slate-300">
        <h1 className="font-bold text-xl text-gray-700">Create New Role</h1>
        <form onSubmit={submitHandler}>
          <div id="roleNameContainer" className="mt-4">
            <label htmlFor="role_name">Role Name: </label>
            <input
              type="text"
              id="role_name"
              name="role_name"
              required
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div id="roleIdContainer" className="mt-4">
            <label htmlFor="role_id">Role ID: </label>
            <input
              type="text"
              id="role_id"
              name="role_id"
              required
              onChange={(e) => setRoleId(parseInt(e.target.value))}
            />
          </div>
          <button className="mt-4 py-2 px-4 rounded-md font-bold text-white bg-teal-800">
            Create Role
          </button>
        </form>
      </div>
    </section>
  );
};
