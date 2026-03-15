import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Reservation {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

export type ReservationState = Reservation[];

const initialState: ReservationState = [];

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<ReservationState>) => {
      return action.payload;
    },
  },
});

export const { setReservations } = reservationsSlice.actions;
export default reservationsSlice.reducer;
