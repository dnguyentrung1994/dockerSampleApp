import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { toast, Slide, Flip, Zoom } from "react-toastify";
import { FetchStatus } from "../interfaces/enums";
import { LoginInterface, UserState } from "../interfaces/user";
import { APIPost } from "../utils/api-calls";
import HttpApi from "../utils/api-calls/useHeaderInterceptor";

const initialState: UserState = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  isAdmin: false,
  accessToken: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserState } = userSlice.actions;

export const LoginAsync =
  (loginData: LoginInterface) => async (dispatch: Dispatch) => {
    try {
      const id = toast.loading("Logging in...", {
        position: "top-center",
        transition: Slide,
      });
      const response = await APIPost("auth/login", loginData);
      switch (response.status) {
        case FetchStatus.OK: {
          dispatch(
            setUserState({
              ...response.data,
            })
          );
          toast.update(id, {
            type: "success",
            isLoading: false,
            render: "Logged in!",
            transition: Flip,
          });
          return response;
        }

        case FetchStatus.BAD_RESPONSE:
        case FetchStatus.NO_RESPONSE: {
          toast.update(id, {
            type: "warning",
            isLoading: false,
            render: response.data.message ?? "Failed to login",
            transition: Flip,
          });
          return response;
        }

        default: {
          toast.update(id, {
            type: "error",
            isLoading: false,
            render: "Internal Error!!!",
            transition: Zoom,
          });
          return response;
        }
      }
    } catch (error) {}
  };

export const refreshTokens = () => async (dispatch: Dispatch) => {
  try {
    const refreshTokenResponse = await HttpApi.post(
      `${process.env.REACT_APP_API_ROUTE}auth/refresh`,
      null,
      {
        withCredentials: true,
      }
    );
    if (refreshTokenResponse) {
    }
  } catch (error) {}
};
export default userSlice.reducer;
