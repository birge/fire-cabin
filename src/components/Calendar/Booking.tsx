import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  isSameDay,
  differenceInDays,
  areIntervalsOverlapping,
  startOfDay,
  endOfDay,
} from "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { AppState } from "../../store";
import { db } from "../../database";

const selectCurrentUser = (state: AppState) => state.currentUser;
const selectDates = (state: AppState) => state.dates;
const selectReservations = (state: AppState) => state.reservations;

const Booking: React.FC = () => {
  const [showSelector, setShowSelector] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const currentUser = useSelector(selectCurrentUser);
  const dates = useSelector(selectDates);
  const reservations = useSelector(selectReservations);

  const handleSetStartDate = (date: Date | null) => {
    setStartDate(date);
  };

  const handleSetEndDate = (date: Date | null) => {
    setEndDate(date);
  };

  const toggleShowSelector = () => setShowSelector((prev) => !prev);

  const handleSubmit = () => {
    if (!startDate) {
      return setError("Please pick a start date.");
    }

    if (!endDate) {
      return setError("Please pick an end date.");
    }

    if (isSameDay(startDate, endDate)) {
      return setError("Reserve at least one night");
    }

    if (endDate < startDate) {
      return setError("End date must be after start date.");
    }

    if (Math.abs(differenceInDays(startDate, endDate)) > 30) {
      return setError("Please reserve less than 30 days.");
    }

    const conflict = reservations.some((reservation) => {
      return areIntervalsOverlapping(
        { start: endOfDay(startDate), end: startOfDay(endDate) },
        {
          start: endOfDay(reservation.startDate),
          end: startOfDay(reservation.endDate),
        }
      );
    });

    if (conflict) {
      return setError("Reservation conflicts with anothere reservation");
    }

    db.collection("events").add({
      startDate,
      endDate,
      userId: currentUser.id,
      year: dates.year,
    });

    setShowSelector(false);
    setError("");
  };

  if (!currentUser.loggedIn) {
    return null;
  }

  const startIntialDate = new Date(`${dates.year}-${dates.month + 1}-1 3:00`);

  const endInitialDate = startDate ? startDate : startIntialDate;

  return (
    <>
      <Button variant="contained" color="primary" onClick={toggleShowSelector}>
        Reserve time
      </Button>
      {showSelector && (
        <>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              disablePast
              format="MM/dd/yyyy"
              initialFocusedDate={startIntialDate}
              label="Start date"
              margin="normal"
              minDateMessage={"Date can't be in the past"}
              onChange={handleSetStartDate}
              value={startDate}
              variant="inline"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              autoOk
              disablePast
              format="MM/dd/yyyy"
              initialFocusedDate={endInitialDate}
              label="End date"
              margin="normal"
              minDate={startDate}
              minDateMessage={"Date needs to be after start date"}
              onChange={handleSetEndDate}
              value={endDate}
              variant="inline"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </MuiPickersUtilsProvider>
          {error && <div>{error}</div>}
        </>
      )}
    </>
  );
};

export default Booking;
