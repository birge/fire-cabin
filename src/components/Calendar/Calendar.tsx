import React, { useState, useMemo } from "react";
import { createComponent, createComponentWithProxy } from "react-fela";
import * as moment from "moment";
import { chunk } from "lodash";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button } from "@material-ui/core";

import Day from "./Day";
import { getFamilyOrder } from "../../utils";

const borderColor = "#dddddd";

const Table = createComponent(
  () => ({
    marginTop: "50px",
    width: "100%",
    border: `1px solid ${borderColor}`,
    borderCollapse: "collapse"
  }),
  "table"
);

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

const TableHeaders = createComponent(
  () => ({
    backgroundColor: "#DDD",
    color: "#666",
    textAlign: "center",
    border: "1px solid #999",
    width: `${100 / 7}%`
  }),
  "th"
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

const getDefaultState = () => {
  const month = moment.default().get("month");
  const year = moment.default().get("year");
  const dates = getDates(month, year);

  return { month, year, dates };
};

const Calendar: React.FC = React.memo(() => {
  const [dates, setDates] = useState(getDefaultState());

  const header = moment
    .default({ month: dates.month, year: dates.year })
    .format("MMMM YYYY");

  const handlePrevClick = () => {
    const newMonth = dates.month === 0 ? 11 : dates.month - 1;
    const newYear = dates.month === 0 ? dates.year - 1 : dates.year;

    setDates({
      month: newMonth,
      year: newYear,
      dates: getDates(newMonth, newYear)
    });
  };

  const familyOrder = useMemo(() => getFamilyOrder(dates.year), [dates.year]);

  const handleNextClick = () => {
    const newMonth = dates.month === 11 ? 0 : dates.month + 1;
    const newYear = dates.month === 11 ? dates.year + 1 : dates.year;

    setDates({
      month: newMonth,
      year: newYear,
      dates: getDates(newMonth, newYear)
    });
  };

  const handleTodayClick = () => {
    setDates(getDefaultState);
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

      <Table>
        <thead>
          <tr>
            <TableHeaders>Sunday</TableHeaders>
            <TableHeaders>Monday</TableHeaders>
            <TableHeaders>Tuesday</TableHeaders>
            <TableHeaders>Wednesday</TableHeaders>
            <TableHeaders>Thursday</TableHeaders>
            <TableHeaders>Friday</TableHeaders>
            <TableHeaders>Saturday</TableHeaders>
          </tr>
        </thead>
        <tbody>
          {dates.dates.map((week, i) => (
            <tr key={i}>
              {week.map(day => (
                <Day
                  key={day.format("m d YYYY")}
                  day={day}
                  familyOrder={familyOrder}
                  month={dates.month}
                  year={dates.year}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Column>
  );
});

export default Calendar;
