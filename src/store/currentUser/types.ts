export interface CurrentUserState {
  id: string;
  email: string;
  loggedIn: boolean;
  name: string;
}

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";

interface setCurrentUserAction {
  type: typeof SET_CURRENT_USER;
  payload: CurrentUserState;
}

interface RemoveCurrentUserAction {
  type: typeof REMOVE_CURRENT_USER;
}

export type CurrentUserActionTypes =
  | setCurrentUserAction
  | RemoveCurrentUserAction;
