export type PageState =
  | typeof LOGIN
  | typeof REGISTER
  | typeof HOME
  | typeof PROFILE;

export const HOME = "HOME";
export const LOGIN = "LOGIN";
export const PROFILE = "PROFILE";
export const REGISTER = "REGISTER";

interface SetLoginAction {
  type: typeof LOGIN;
}
interface SetRegisterAction {
  type: typeof REGISTER;
}
interface SetHomeAction {
  type: typeof HOME;
}
interface SetProfileAction {
  type: typeof PROFILE;
}

export type PageActionTypes =
  | SetLoginAction
  | SetRegisterAction
  | SetHomeAction
  | SetProfileAction;
