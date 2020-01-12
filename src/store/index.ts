import { createStore, combineReducers } from "redux";

import userReducer from "./user/reducers";

const rootReducer = combineReducers({
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer);

  return store;
}
