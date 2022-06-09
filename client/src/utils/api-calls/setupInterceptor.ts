import { AnyAction, CombinedState, EnhancedStore } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs, { unix } from "dayjs";
import jwtDecode from "jwt-decode";
import { ThunkMiddleware } from "redux-thunk";
import { IToken } from "../../interfaces/user";
import { AppState } from "../../store";
import { refreshToken } from "../../store/user.store";
import HttpApi from "./index";

const setupInterceptor = (
  store: EnhancedStore<
    CombinedState<AppState>,
    AnyAction,
    [ThunkMiddleware<CombinedState<AppState>, AnyAction, undefined>]
  >
) => {
  const handleError = async (error: AxiosError | Error) => {
    return Promise.reject(error);
  };

  HttpApi.interceptors.request.use(async (request) => {
    let jwtToken = store?.getState()?.user?.accessToken;
    if (jwtToken) {
      const { exp: unixExpireDate }: IToken = jwtDecode(jwtToken);
      const tokenExpireDate = unix(unixExpireDate);
      const isApiUrl = request.url?.startsWith(
        process.env.REACT_APP_API_ROUTE ?? "ERROR"
      );
      if (tokenExpireDate.diff(dayjs()) < 1) {
        try {
          store.dispatch(refreshToken());

          if (store?.getState()?.user?.accessToken)
            jwtToken = store.getState().user.accessToken;
        } catch (error) {}
      }
      request.headers =
        isApiUrl && jwtToken
          ? { ...request.headers, Authorization: jwtToken }
          : request.headers;
    }
    return request;
  });

  HttpApi.interceptors.response.use((response) => response, handleError);
};

export default setupInterceptor;
