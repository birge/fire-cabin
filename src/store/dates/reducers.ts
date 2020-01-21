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

import {
  DateState,
  SET_NEXT_MONTH,
  SET_PREVIOUS_MONTH,
  SET_TODAY,
  DateActionTypes
} from "./types";

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

const getNextMonth = (state: DateState): DateState => {
  const newMonth = state.month === 11 ? 0 : state.month + 1;
  const newYear = state.month === 11 ? state.year + 1 : state.year;

  return {
    month: newMonth,
    year: newYear,
    dates: getDates(newMonth, newYear)
  };
};

const getPreviousMonth = (state: DateState): DateState => {
  const newMonth = state.month === 0 ? 11 : state.month - 1;
  const newYear = state.month === 0 ? state.year - 1 : state.year;

  return {
    month: newMonth,
    year: newYear,
    dates: getDates(newMonth, newYear)
  };
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

function userReducer(
  state = getDefaultState(),
  action: DateActionTypes
): DateState {
  switch (action.type) {
    case SET_NEXT_MONTH:
      return getNextMonth(state);
    case SET_PREVIOUS_MONTH:
      return getPreviousMonth(state);
    case SET_TODAY:
      return getDefaultState();
    default:
      return state;
  }
}

export default userReducer;
