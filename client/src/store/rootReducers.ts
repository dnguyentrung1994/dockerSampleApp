import user from "./user.store";
import { combineReducers } from "@reduxjs/toolkit";

const RootReducer = combineReducers({ user });

export default RootReducer;
