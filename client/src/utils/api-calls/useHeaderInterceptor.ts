import axios, { AxiosError } from "axios";
import dayjs, { unix } from "dayjs";
import jwtDecode from "jwt-decode";
import { FetchStatus } from "../../interfaces/enums";
import { IToken } from "../../interfaces/user";

let store: any;
export const injectStore = (_store: any) => {
  store = _store;
};
const HttpApi = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE,
});

HttpApi.interceptors.request.use(async (request) => {
  const jwtToken = store?.getState()?.user?.accessToken;
  if (jwtToken) {
    const { exp: unixExpireDate }: IToken = jwtDecode(jwtToken);
    const tokenExpireDate = unix(unixExpireDate);
    if (tokenExpireDate.diff(dayjs()) < 1) {
    }
  }
  const isApiUrl = request.url?.startsWith(
    process.env.REACT_APP_API_ROUTE ?? "ERROR"
  );
  request.headers =
    jwtToken && isApiUrl
      ? { ...request.headers, Authorization: jwtToken }
      : request.headers;
  return request;
});

HttpApi.interceptors.response.use(
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

export default HttpApi;
