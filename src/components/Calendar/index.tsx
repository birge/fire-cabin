import React from "react";
import { Container } from "@mui/material";

import Calendar from "./Calendar";
import Booking from "./Booking";
import { families } from "../../constants";

const pillStyle: React.CSSProperties = {
  borderRadius: "15px",
  padding: "3px 10px",
  margin: "0 3px"
};

const CalendarWrapper: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <h1 style={{ margin: "10px 0" }}>Calendar</h1>
      <Booking />
      <div style={{ marginTop: "10px" }}>
        Prioirty Time Color Code:
        <span style={{ ...pillStyle, backgroundColor: families.lucile.color }}>Lucile</span>
        <span style={{ ...pillStyle, backgroundColor: families.isabel.color }}>Isabel</span>
        <span style={{ ...pillStyle, backgroundColor: families.jane.color }}>Jane</span>
      </div>
      <div style={{ width: "100%", border: ".5px solid gray", margin: "20px 0" }} />
      <Calendar />
    </Container>
  );
};

export default CalendarWrapper;
