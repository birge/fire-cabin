import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";

import Day from "./Day";
import { getFamilyOrder } from "../../utils";
import { AppState } from "../../store";
import {
  setPreviousMonth,
  setNextMonth,
  setToday
} from "../../store/dates/actions";

const borderColor = "#dddddd";

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button variant="outlined" onClick={handleTodayClick}>
          Today
        </Button>
        <ChevronLeftIcon
          style={{ fontSize: "40px" }}
          onClick={handlePrevClick}
        />
        <ChevronRightIcon
          style={{ fontSize: "40px" }}
          onClick={handleNextClick}
        />
        <h1 style={{ fontSize: "40px", margin: 0 }}>{header}</h1>
      </div>

      <table
        style={{
          marginTop: "50px",
          width: "100%",
          border: `1px solid ${borderColor}`,
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
              day => (
                <th
                  key={day}
                  style={{
                    backgroundColor: "#DDD",
                    color: "#666",
                    textAlign: "center",
                    border: "1px solid #999",
                    width: `${100 / 7}%`
                  }}
                >
                  {day}
                </th>
              )
            )}
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
      </table>
    </div>
  );
});

export default Calendar;
