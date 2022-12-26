import axios, { AxiosResponse } from "axios";

export async function getFetch(url: string, params = null) {
  return await axios({
    url: url,
    method: "GET",
    params: params,
  }).then((res: AxiosResponse<any, any>) => res.data);
}
