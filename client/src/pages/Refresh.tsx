import { useEffect } from "react";
import api from "../util/axios";

const Refresh = () => {
  useEffect(() => {
    api
      .get("/refresh", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Refresh</h1>
    </div>
  );
};

export default Refresh;
