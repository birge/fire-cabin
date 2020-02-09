export type ReservationState = Reservation[];

export interface Reservation {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

export const SET_RESERVATIONS = "SET_RESERVATIONS";

interface SetReservationsAction {
  type: typeof SET_RESERVATIONS;
  payload: ReservationState;
}

export type ReservationsActionTypes = SetReservationsAction;
