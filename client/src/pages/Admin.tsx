import api from "../util/axios";

const Admin = () => {
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    api
      .post("/admin")
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  return (
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
          />
          <button className="py-4 px-8 bg-teal-700 mt-4 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
