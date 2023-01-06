import { apiPrivate } from "../util/axios";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useAuthContext } from "./useAuth";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuthContext();

  useEffect(() => {
    // * do this before request is sent
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        if (config.headers && !config?.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // * do something after response
    const responseIntercept = apiPrivate.interceptors.response.use(
      // * if response status is 2XX
      (response) => response,
      // * if response status is NOT 2XX
      async (err) => {
        const prevRequest = err?.config;

        if (err?.response?.status === 403) {
          console.log("useAxiosPrivate err.response.status ===403");

          if (!prevRequest?.sent) {
            console.log("prevRequest.sent is falsy");
            prevRequest.sent = true;

            const newAccessToken = await refresh();

            prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;

            return apiPrivate(prevRequest);
          }
          throw new Error("err.response.status not equal to 403");
        }

        // if (err?.response?.status === 403 && !prevRequest?.sent) {
        //   prevRequest.sent = true;

        //   const newAccessToken = await refresh();

        //   prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;

        //   return apiPrivate(prevRequest);
        // }

        return Promise.reject(err);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept);
      apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return apiPrivate;
};
