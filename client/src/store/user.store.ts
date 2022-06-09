import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast, Slide, Flip, Zoom } from "react-toastify";
import { LoginInterface, UserState } from "../interfaces/user";
import HttpApi from "../utils/api-calls";

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
    const id = toast.loading("Logging in...", {
      position: "top-center",
      transition: Slide,
    });
    try {
      const response = await HttpApi.post("auth/login", loginData, {
        withCredentials: true,
      });
      console.log(response.headers);
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
        autoClose: 1000,
      });
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.update(id, {
            type: "warning",
            isLoading: false,
            render: "Failed to Login!",
            transition: Flip,
            autoClose: 1000,
          });
          throw error.response;
        } else if (error.request) {
          toast.update(id, {
            type: "info",
            isLoading: false,
            render: "No responds from server!",
            transition: Flip,
            autoClose: 1000,
          });
          throw error.request;
        }
      } else {
        toast.update(id, {
          type: "error",
          isLoading: false,
          render: "Unknown Error",
          autoClose: 1000,
          transition: Zoom,
        });
        throw error;
      }
    }
  };

export const refreshToken = () => async (dispatch: Dispatch) => {
  try {
    const response = await HttpApi.post("auth/refresh", null, {
      withCredentials: true,
    });

    console.log(response);
    dispatch(
      setUserState({
        ...response.data,
      } as UserState)
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response;
      } else if (error.request) {
        throw error.request;
      }
    } else {
      throw error;
    }
  }
};

export default userSlice.reducer;
