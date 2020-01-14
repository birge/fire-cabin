import {
  PageState,
  HOME,
  LOGIN,
  PROFILE,
  REGISTER,
  PageActionTypes
} from "./types";

const initialState: PageState = HOME;

function pageReducer(state = initialState, action: PageActionTypes): PageState {
  switch (action.type) {
    case HOME:
      return HOME;
    case LOGIN:
      return LOGIN;
    case PROFILE:
      return PROFILE;
    case REGISTER:
      return REGISTER;
    default:
      return state;
  }
}

export default pageReducer;
