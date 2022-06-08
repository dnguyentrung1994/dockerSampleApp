import axios, { AxiosError, AxiosResponse } from "axios";
import { FetchStatus } from "../../interfaces/enums";

export const APIPost = async (
  url: string,
  data: any,
  token?: string | undefined
): Promise<{ status: FetchStatus; data: any }> => {
  return await axios
    .post(`${process.env.REACT_APP_API_ROUTE}${url}`, data, {
      headers: token ? { Authorization: token } : undefined,
    })
    .then((response: AxiosResponse<any, any>) => ({
      status: FetchStatus.OK,
      data: response.data,
    }))
    .catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return {
            status: FetchStatus.BAD_RESPONSE,
            data: error.response.data,
          };
        } else if (error.request) {
          return {
            status: FetchStatus.NO_RESPONSE,
            data: { message: "Server did not respond!" },
          };
        }
      }
      return {
        status: FetchStatus.OTHERS,
        data: error,
      };
    });
};
