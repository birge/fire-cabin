import React from "react";
import { useFela } from "react-fela";
import { isSameDay } from "date-fns/esm";

import {
  family,
  firstPeriod,
  secondPeriod,
  thirdPeriod,
  datePeriod
} from "../../constants";

import Events from "./Events";

const today = new Date();

const inReservePeriod = (day: Date, period: datePeriod): boolean => {
  const month = day.getMonth();
  const date = day.getDate();

  return (
    (month === period.start.month && date >= period.start.date) ||
    (month === period.end.month && date < period.end.date)
  );
};

const dayCss = (day: Date, familyOrder: family[], month: number) => {
  let backgroundColor = "white";

  isSameDay(today, day);

  if (isSameDay(today, day)) {
    backgroundColor = "#D7F2FF";
  } else if (inReservePeriod(day, firstPeriod)) {
    backgroundColor = familyOrder[0].color;
  } else if (inReservePeriod(day, secondPeriod)) {
    backgroundColor = familyOrder[1].color;
  } else if (inReservePeriod(day, thirdPeriod)) {
    backgroundColor = familyOrder[2].color;
  }

  return {
    color: day.getMonth() === month ? "black" : "#CCC",
    height: "90px",
    verticalAlign: "top",
    fontSize: "16px",
    padding: "6px, 0",
    border: "1px solid #999",
    backgroundColor
  };
};

type TodoItemProps = {
  day: Date;
  familyOrder: family[];
  month: number;
  year: number;
};

const Day: React.FC<TodoItemProps> = React.memo(
  ({ day, familyOrder, month, year }) => {
    const { css } = useFela();

    return (
      <td className={css(dayCss(day, familyOrder, month))}>
        {day.getDate()}
        <Events day={day} />
      </td>
    );
  }
);

export default Day;
