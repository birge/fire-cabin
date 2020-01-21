import React from "react";
import { Container } from "@material-ui/core";
import { useFela } from "react-fela";

import Calendar from "./Calendar";
import Booking from "./Booking";
import { families } from "../../constants";

const pill = () => ({
  borderRadius: "15px",
  padding: "3px 10px",
  margin: "0 3px"
});

const lucile = () => ({
  backgroundColor: families.lucile.color
});

const isabel = () => ({
  backgroundColor: families.isabel.color
});

const jane = () => ({
  backgroundColor: families.jane.color
});

const spacer = () => ({
  width: "100%",
  border: ".5px solid gray",
  margin: "20px 0"
});

const priority = () => ({
  marginTop: "10px"
});

const header = () => ({
  margin: "10px 0"
});

const CalendarWrapper: React.FC = () => {
  const { css } = useFela();
  return (
    <Container maxWidth="xl">
      <h1 className={css(header)}>Calendar</h1>
      <Booking />
      <div className={css(priority)}>
        Prioirty Time Color Code:
        <span className={css(pill, lucile)}>Lucile</span>
        <span className={css(pill, isabel)}>Isabel</span>
        <span className={css(pill, jane)}>Jane</span>
      </div>
      <div className={css(spacer)} />
      <Calendar />
    </Container>
  );
};

export default CalendarWrapper;
