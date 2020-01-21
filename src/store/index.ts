import { createStore, combineReducers } from "redux";

import datesReducer from "./dates/reducers";
import pageReducer from "./page/reducers";
import userReducer from "./user/reducers";

const rootReducer = combineReducers({
  dates: datesReducer,
  page: pageReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer);

  return store;
}
