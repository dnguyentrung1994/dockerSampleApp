import axios, { AxiosInstance } from "axios";
import dayjs, { unix } from "dayjs";
import jwtDecode from "jwt-decode";
import { IToken } from "../../interfaces/user";
import { useAppState } from "../../store";

const useHeaderInterceptor = (axiosInstance: AxiosInstance) => {
  const { accessToken } = useAppState((state) => state.user);
  axiosInstance.interceptors.request.use(
    async (config) => {
      const jwtToken = accessToken;
      if (jwtToken) {
        const { exp: unixExpireDate }: IToken = jwtDecode(jwtToken);
        const tokenExpireDate = unix(unixExpireDate);

        if (tokenExpireDate.diff(dayjs()) < 1) {
          const refreshTokenResponse = await axios.post(
            `${process.env.REACT_APP_API_ROUTE}auth/refresh`,
            null,
            {
              withCredentials: true,
            }
          );
        }
      }
      const isApiUrl = config.url?.startsWith(
        process.env.REACT_APP_API_ROUTE ?? "ERROR"
      );
      config.headers =
        jwtToken && isApiUrl
          ? { ...config.headers, Authorization: jwtToken }
          : config.headers;
      return config;
    },
    (error) => {}
  );
};
export default useHeaderInterceptor;
