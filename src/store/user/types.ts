export interface UserState {
  id: string;
  email: string;
  loggedIn: boolean;
  name: string;
}

export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

interface SetUserAction {
  type: typeof SET_USER;
  payload: UserState;
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

export type UserActionTypes = SetUserAction | RemoveUserAction;
