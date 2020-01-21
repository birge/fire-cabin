import React from "react";
import * as moment from "moment";
import { useFela } from "react-fela";

import {
  family,
  firstPeriod,
  secondPeriod,
  thirdPeriod,
  datePeriod
} from "../../constants";

const today = moment.default();

const inReservePeriod = (day: moment.Moment, period: datePeriod): boolean => {
  const month = day.get("month");
  const date = day.get("date");

  return (
    (month === period.start.month && date >= period.start.date) ||
    (month === period.end.month && date < period.end.date)
  );
};
const dayCss = (day: moment.Moment, familyOrder: family[], month: number) => {
  let backgroundColor = "white";

  if (day.isSame(today, "day")) {
    backgroundColor = "#D7F2FF";
  } else if (inReservePeriod(day, firstPeriod)) {
    backgroundColor = familyOrder[0].color;
  } else if (inReservePeriod(day, secondPeriod)) {
    backgroundColor = familyOrder[1].color;
  } else if (inReservePeriod(day, thirdPeriod)) {
    backgroundColor = familyOrder[2].color;
  }

  return {
    color: day.get("month") === month ? "black" : "#CCC",
    height: "80px",
    verticalAlign: "top",
    fontSize: "16px",
    padding: "6px, 0",
    border: "1px solid #999",
    backgroundColor
  };
};

type TodoItemProps = {
  day: moment.Moment;
  familyOrder: family[];
  month: number;
  year: number;
};

const Day: React.FC<TodoItemProps> = React.memo(
  ({ day, familyOrder, month, year }) => {
    const { css } = useFela();

    return (
      <td className={css(dayCss(day, familyOrder, month))}>
        {day.format("D")}
      </td>
    );
  }
);

export default Day;
