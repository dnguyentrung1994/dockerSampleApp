import axios, { AxiosError, AxiosResponse } from "axios";

export const APIGet = async (
  url: string,
  token?: string
): Promise<Record<string, unknown>> => {
  return await axios
    .get(`${process.env.REACT_APP_API_ROUTE}${url}`, {
      headers: token ? { Authorization: token } : undefined,
    })
    .then((response: AxiosResponse<any, any>) => response.data)
    .catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data;
        } else if (error.request) {
          return { message: "Server did not respond!" };
        }
      }
      return error;
    });
};
