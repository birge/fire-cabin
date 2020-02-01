import { UsersState, SET_CURRENT_USERS, UsersActionTypes } from "./types";

const initialState: UsersState = {};

function userReducer(
  state = initialState,
  action: UsersActionTypes
): UsersState {
  switch (action.type) {
    case SET_CURRENT_USERS:
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;
