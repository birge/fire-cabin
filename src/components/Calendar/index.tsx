import React from "react";
import { Container } from "@material-ui/core";
import { useFela } from "react-fela";

import Calendar from "./Calendar";

const pill = () => ({
  borderRadius: "15px",
  padding: "3px 10px",
  margin: "0 3px"
});

const lucile = () => ({
  backgroundColor: "#8D98E1"
});

const isabel = () => ({
  backgroundColor: "#3CCC92"
});

const jane = () => ({
  backgroundColor: "#CE6C6F"
});

const spacer = () => ({
  width: "100%",
  border: ".5px solid gray",
  margin: "20px 0"
});

const CalendarWrapper: React.FC = () => {
  const { css } = useFela();
  return (
    <Container maxWidth="xl">
      <h1>Calendar</h1>
      <div>
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
