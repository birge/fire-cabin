import React, { useState } from "react";
import { createComponent, createComponentWithProxy } from "react-fela";
import * as moment from "moment";
import { chunk, memoize } from "lodash";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button } from "@material-ui/core";

import Day from "./Day";

const Column = createComponent(() => ({
  display: "flex",
  flexDirection: "column"
}));

const Row = createComponent(() => ({
  display: "flex",
  flexDirection: "row"
}));

const LeftChevron = createComponentWithProxy(
  () => ({
    fontSize: "40px"
  }),
  ChevronLeftIcon
);

const RightChevron = createComponentWithProxy(
  () => ({
    fontSize: "40px"
  }),
  ChevronRightIcon
);

const Header = createComponent(
  () => ({
    fontSize: "40px",
    margin: 0
  }),
  "h1"
);

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

const getDates = memoize((month: number, year: number): moment.Moment[][] => {
  const startDate = getStartDate(month, year);
  const endDate = getEndDate(month, year);
  const dates = [];

  let currentDate = startDate;

  while (currentDate.isSameOrBefore(endDate)) {
    dates.push(currentDate);
    currentDate = moment.default(currentDate).add(1, "d");
  }

  return chunk(dates, 7);
});

const getDefaultState = () => {
  const month = moment.default().get("month");
  const year = moment.default().get("year");
  const dates = getDates(month, year);

  return { month, year, dates };
};

const Calendar: React.FC = React.memo(() => {
  const [newDates, setNewDates] = useState(getDefaultState());

  const header = moment
    .default({ month: newDates.month, year: newDates.year })
    .format("MMMM YYYY");

  const handlePrevClick = () => {
    const newMonth = newDates.month === 0 ? 11 : newDates.month - 1;
    const newYear = newDates.month === 0 ? newDates.year - 1 : newDates.year;

    setNewDates({
      month: newMonth,
      year: newYear,
      dates: getDates(newMonth, newYear)
    });
  };

  const handleNextClick = () => {
    const newMonth = newDates.month === 11 ? 0 : newDates.month + 1;
    const newYear = newDates.month === 11 ? newDates.year + 1 : newDates.year;

    setNewDates({
      month: newMonth,
      year: newYear,
      dates: getDates(newMonth, newYear)
    });
  };

  const handleTodayClick = () => {
    setNewDates(getDefaultState);
  };

  return (
    <Column>
      <Row>
        <Button variant="outlined" onClick={handleTodayClick}>
          Today
        </Button>
        <LeftChevron onClick={handlePrevClick} />
        <RightChevron onClick={handleNextClick} />
        <Header>{header}</Header>
      </Row>

      <table>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {newDates.dates.map((week, i) => (
            <tr key={i}>
              {week.map(day => (
                <Day key={day.format("m d YYYY")} day={day} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Column>
  );
});

export default Calendar;
