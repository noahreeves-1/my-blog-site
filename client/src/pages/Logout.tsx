import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../util/axios";
import { useAuthContext } from "../hooks/useAuth";

export const Logout = () => {
  const [err, setErr] = useState("");
  const { setAuth } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setAuth(null);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setErr("Something went wrong");
      });
  });

  return (
    <div>
      <p>{err}</p>
    </div>
  );
};
