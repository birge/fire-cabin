export interface DateState {
  month: number;
  year: number;
  dates: Date[][];
}

export const SET_NEXT_MONTH = "SET_NEXT_MONTH";
export const SET_PREVIOUS_MONTH = "SET_PREVIOUS_MONTH";
export const SET_TODAY = "SET_TODAY";

interface SetNextMonthAction {
  type: typeof SET_NEXT_MONTH;
}

interface SetPreviousMonthAction {
  type: typeof SET_PREVIOUS_MONTH;
}

interface SetTodayAction {
  type: typeof SET_TODAY;
}

export type DateActionTypes =
  | SetNextMonthAction
  | SetPreviousMonthAction
  | SetTodayAction;
