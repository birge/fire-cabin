import { createStore, combineReducers } from "redux";

import userReducer from "./user/reducers";
import pageReducer from "./page/reducers";

const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer);

  return store;
}
