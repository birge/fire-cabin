import {
  CurrentUserState,
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  CurrentUserActionTypes
} from "./types";

const initialState: CurrentUserState = {
  id: "",
  email: "",
  loggedIn: false,
  name: ""
};

function currentUserReducer(
  state = initialState,
  action: CurrentUserActionTypes
): CurrentUserState {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    case REMOVE_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
}

export default currentUserReducer;
