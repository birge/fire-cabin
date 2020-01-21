import { SET_NEXT_MONTH, SET_PREVIOUS_MONTH, SET_TODAY } from "./types";

export function setNextMonth() {
  return {
    type: SET_NEXT_MONTH
  };
}
export function setPreviousMonth() {
  return {
    type: SET_PREVIOUS_MONTH
  };
}
export function setToday() {
  return {
    type: SET_TODAY
  };
}
