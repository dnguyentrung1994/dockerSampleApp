import axios, { AxiosError, AxiosResponse } from "axios";

export const APIPatch = async (
  url: string,
  data: Record<string, unknown>,
  token?: string | undefined
): Promise<Record<string, unknown>> => {
  return await axios
    .patch(`${process.env.REACT_APP_API_ROUTE}${url}`, data, {
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
