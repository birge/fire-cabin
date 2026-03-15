import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfWeek
} from "date-fns";
import chunk from "lodash/chunk";

export interface DateState {
  month: number;
  year: number;
  dates: Date[][];
}

const getStartDate = (month: number, year: number): Date =>
  startOfWeek(startOfMonth(new Date(year, month)));

const getEndDate = (month: number, year: number): Date =>
  endOfWeek(endOfMonth(new Date(year, month)));

const getDates = (month: number, year: number): Date[][] => {
  const startDate = getStartDate(month, year);
  const endDate = getEndDate(month, year);
  const dates = [];

  let currentDate = startDate;

  while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return chunk(dates, 7);
};

const getDefaultState = (): DateState => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  return {
    month,
    year,
    dates: getDates(month, year)
  };
};

const datesSlice = createSlice({
  name: "dates",
  initialState: getDefaultState(),
  reducers: {
    setNextMonth: (state) => {
      const newMonth = state.month === 11 ? 0 : state.month + 1;
      const newYear = state.month === 11 ? state.year + 1 : state.year;
      state.month = newMonth;
      state.year = newYear;
      state.dates = getDates(newMonth, newYear);
    },
    setPreviousMonth: (state) => {
      const newMonth = state.month === 0 ? 11 : state.month - 1;
      const newYear = state.month === 0 ? state.year - 1 : state.year;
      state.month = newMonth;
      state.year = newYear;
      state.dates = getDates(newMonth, newYear);
    },
    setToday: () => {
      return getDefaultState();
    }
  }
});

export const { setNextMonth, setPreviousMonth, setToday } = datesSlice.actions;
export default datesSlice.reducer;
