import api from "../util/axios";
import { useAuthContext } from "./useAuth";

export const useRefreshToken = () => {
  const { auth, setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await api.get("/refresh", { withCredentials: true });

    const newAccessToken = response.data.accessToken;

    console.log(auth);
    console.log(newAccessToken);

    const updatedUser = {
      username: auth?.username,
      roles: auth?.roles,
      accessToken: newAccessToken,
    };

    setAuth(updatedUser);

    return response.data.accessToken;
  };

  return refresh;
};
