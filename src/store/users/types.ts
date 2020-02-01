interface UserState {
  id: string;
  email: string;
  name: string;
}

export interface UsersState {
  [id: string]: {
    id: string;
    email: string;
    name: string;
  };
}

export const SET_CURRENT_USERS = "SET_CURRENT_USERS";

interface SetUsersAction {
  type: typeof SET_CURRENT_USERS;
  payload: UsersState;
}

export type UsersActionTypes = SetUsersAction;
