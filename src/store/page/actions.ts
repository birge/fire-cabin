import { HOME, LOGIN, PROFILE, REGISTER } from "./types";

export function setPageHome() {
  return {
    type: HOME
  };
}

export function setPageLogin() {
  return {
    type: LOGIN
  };
}

export function setPageProfile() {
  return {
    type: PROFILE
  };
}

export function setPageRegister() {
  return {
    type: REGISTER
  };
}
