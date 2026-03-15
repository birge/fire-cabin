import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUser/slice";
import datesReducer from "./dates/slice";
import pageReducer from "./page/slice";
import reservationsReducer from "./reservations/slice";
import usersReducer from "./users/slice";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    dates: datesReducer,
    page: pageReducer,
    reservations: reservationsReducer,
    users: usersReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function getStore() {
  return store;
}
