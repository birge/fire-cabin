import { UserState, SET_USER, REMOVE_USER, UserActionTypes } from "./types";

const initialState: UserState = {
  id: "",
  email: "",
  loggedIn: false,
  name: ""
};

function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
