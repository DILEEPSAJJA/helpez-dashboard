import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./users";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
