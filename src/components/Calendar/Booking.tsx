import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  isSameDay,
  differenceInDays,
  areIntervalsOverlapping,
  startOfDay,
  endOfDay,
} from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { collection, addDoc } from "firebase/firestore";

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

    addDoc(collection(db, "events"), {
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disablePast
              format="MM/dd/yyyy"
              label="Start date"
              onChange={handleSetStartDate}
              value={startDate}
              slotProps={{
                textField: { margin: "normal" }
              }}
            />
            <DatePicker
              disablePast
              format="MM/dd/yyyy"
              label="End date"
              minDate={endInitialDate}
              onChange={handleSetEndDate}
              value={endDate}
              slotProps={{
                textField: { margin: "normal" }
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </LocalizationProvider>
          {error && <div>{error}</div>}
        </>
      )}
    </>
  );
};

export default Booking;
