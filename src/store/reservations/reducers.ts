import {
  ReservationState,
  SET_RESERVATIONS,
  ReservationsActionTypes
} from "./types";

const initialState: ReservationState = [];

function userReducer(
  state = initialState,
  action: ReservationsActionTypes
): ReservationState {
  switch (action.type) {
    case SET_RESERVATIONS:
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;
