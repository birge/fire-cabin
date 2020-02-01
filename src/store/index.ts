import { createStore, combineReducers } from "redux";

import currentUserReducer from "./currentUser/reducers";
import datesReducer from "./dates/reducers";
import pageReducer from "./page/reducers";
import reservationsReducer from "./reservations/reducers";
import usersReducer from "./users/reducers";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  dates: datesReducer,
  page: pageReducer,
  reservations: reservationsReducer,
  users: usersReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    (window as any)?.__REDUX_DEVTOOLS_EXTENSION__?.()
  );

  return store;
}
