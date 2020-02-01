import {
  CurrentUserState,
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER
} from "./types";

export function setCurrentUser(user: CurrentUserState) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
}

export function removeCurrentUser() {
  return {
    type: REMOVE_CURRENT_USER
  };
}
