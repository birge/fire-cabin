import { UsersState, SET_CURRENT_USERS } from "./types";

export function setUsers(users: UsersState) {
  return {
    type: SET_CURRENT_USERS,
    payload: users
  };
}
