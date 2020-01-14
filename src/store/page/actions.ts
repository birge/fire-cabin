import { HOME, LOGIN, PROFILE, REGISTER } from "./types";

export function setPageHome() {
  return {
    payload: HOME
  };
}

export function setPageLogin() {
  return {
    payload: LOGIN
  };
}

export function setPageProfile() {
  return {
    payload: PROFILE
  };
}

export function setPageRegister() {
  return {
    payload: REGISTER
  };
}
