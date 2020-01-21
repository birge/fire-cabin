import * as moment from "moment";
import chunk from "lodash/chunk";

import {
  DateState,
  SET_NEXT_MONTH,
  SET_PREVIOUS_MONTH,
  SET_TODAY,
  DateActionTypes
} from "./types";

const getStartDate = (month: number, year: number): moment.Moment =>
  moment
    .default({ year, month })
    .startOf("month")
    .startOf("week");

const getEndDate = (month: number, year: number): moment.Moment =>
  moment
    .default({ year, month })
    .endOf("month")
    .endOf("week");

const getDates = (month: number, year: number): moment.Moment[][] => {
  const startDate = getStartDate(month, year);
  const endDate = getEndDate(month, year);
  const dates = [];

  let currentDate = startDate;

  while (currentDate.isSameOrBefore(endDate)) {
    dates.push(currentDate);
    currentDate = moment.default(currentDate).add(1, "d");
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
  const month = moment.default().get("month");
  const year = moment.default().get("year");
  const dates = getDates(month, year);

  return { month, year, dates };
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
