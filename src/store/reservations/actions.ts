import { SET_RESERVATIONS, ReservationState } from "./types";

export function setReservations(reservations: ReservationState) {
  return {
    type: SET_RESERVATIONS,
    payload: reservations
  };
}
