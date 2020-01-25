import { createStore, combineReducers } from "redux";

import datesReducer from "./dates/reducers";
import pageReducer from "./page/reducers";
import reservationsReducer from "./reservations/reducers";
import userReducer from "./user/reducers";

const rootReducer = combineReducers({
  dates: datesReducer,
  page: pageReducer,
  reservations: reservationsReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    (window as any)?.__REDUX_DEVTOOLS_EXTENSION__?.()
  );

  return store;
}
