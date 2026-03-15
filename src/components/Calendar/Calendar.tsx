import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, isBefore, isSameDay } from "date-fns";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, Typography, Box } from "@mui/material";

import Day from "./Day";
import { getFamilyOrder } from "../../utils";
import { AppState } from "../../store";
import { Reservation } from "../../store/reservations/slice";
import {
  setPreviousMonth,
  setNextMonth,
  setToday
} from "../../store/dates/slice";

const borderColor = "#dddddd";

const dateSelector = (state: AppState) => state.dates;
const reservationsSelector = (state: AppState) => state.reservations;

/**
 * Assign each reservation a lane (0 = top row, 1 = bottom row).
 */
function computeLanes(reservations: Reservation[]): Map<string, 0 | 1> {
  const sorted = [...reservations].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );
  const lanes = new Map<string, 0 | 1>();

  for (const res of sorted) {
    // Check for overlaps with already assigned reservations
    let usedLanes = new Set<0 | 1>();

    for (const other of sorted) {
      const otherLane = lanes.get(other.id);
      if (otherLane === undefined) continue;

      // Two reservations overlap if A's start is before B's end AND B's start is before A's end.
      // We use <= and >= to include same-day transitions as overlaps.
      const overlaps = (
        (isBefore(res.startDate, other.endDate) || isSameDay(res.startDate, other.endDate)) &&
        (isBefore(other.startDate, res.endDate) || isSameDay(other.startDate, res.endDate))
      );

      if (overlaps) {
        usedLanes.add(otherLane);
      }
    }

    // Assign first available lane (0, then 1, then fallback to 1)
    if (!usedLanes.has(0)) {
      lanes.set(res.id, 0);
    } else {
      lanes.set(res.id, 1);
    }
  }

  return lanes;
}

const Calendar: React.FC = React.memo(() => {
  const dates = useSelector(dateSelector);
  const reservations = useSelector(reservationsSelector);
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

  const reservationLanes = useMemo(
    () => computeLanes(reservations),
    [reservations]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button variant="outlined" onClick={handleTodayClick} size="small" sx={{ mr: 2 }}>
          Today
        </Button>
        <ChevronLeftIcon
          sx={{ fontSize: 32, cursor: "pointer", "&:hover": { color: "primary.main" } }}
          onClick={handlePrevClick}
        />
        <ChevronRightIcon
          sx={{ fontSize: 32, cursor: "pointer", "&:hover": { color: "primary.main" } }}
          onClick={handleNextClick}
        />
        <Typography variant="h4" component="h1" sx={{ ml: 2, fontWeight: 700 }}>
          {header}
        </Typography>
      </Box>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderSpacing: 0
        }}
      >
        <thead>
          <tr>
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
              day => (
                <th
                  key={day}
                  style={{
                    backgroundColor: "#f5f5f5",
                    color: "#666",
                    textAlign: "center",
                    border: "1px solid #ddd",
                    padding: "8px 0",
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
                  reservationLanes={reservationLanes}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
});

export default Calendar;
