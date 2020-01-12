import { UserState, SET_USER, REMOVE_USER } from "./types";

export function setUser(user: UserState) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function removeUser() {
  return {
    type: REMOVE_USER
  };
}
