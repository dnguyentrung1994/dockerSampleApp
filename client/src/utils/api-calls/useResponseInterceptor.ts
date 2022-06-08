import axios, { AxiosError, AxiosInstance } from "axios";
import { FetchStatus } from "../../interfaces/enums";

const useResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return {
        status: FetchStatus.OK,
        data: response.data,
      };
    },
    (error: AxiosError | Error) => {
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
    }
  );
};

export default useResponseInterceptor;
