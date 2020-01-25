import React, { useMemo } from "react";
import { createComponent, createComponentWithProxy } from "react-fela";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button } from "@material-ui/core";

import Day from "./Day";
import { getFamilyOrder } from "../../utils";
import { AppState } from "../../store";
import {
  setPreviousMonth,
  setNextMonth,
  setToday
} from "../../store/dates/actions";

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

interface reservations {}

const dateSelector = (state: AppState) => state.dates;

const Calendar: React.FC = React.memo(() => {
  const dates = useSelector(dateSelector);
  const dispatch = useDispatch();

  const header = format(new Date(dates.year, dates.month), "MMMM yyyy");

  const handlePrevClick = () => {
    dispatch(setPreviousMonth());
  };

  const familyOrder = useMemo(() => getFamilyOrder(dates.year), [dates.year]);

  const handleNextClick = () => {
    dispatch(setNextMonth());
  };

  const handleTodayClick = () => {
    dispatch(setToday());
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
                  key={day.toString()}
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
