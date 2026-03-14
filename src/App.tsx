import React from "react";
import Container from "@mui/material/Container";

import Main from "./components/Main";
import useCurrentUserDetection from "./hooks/useCurrentUserDetection";
import useReservations from "./hooks/useReservations";
import useUsers from "./hooks/useUsers";
import Nav from "./components/Nav";

const App: React.FC = () => {
  useCurrentUserDetection();
  useReservations();
  useUsers();

  return (
    <Container maxWidth="xl">
      <div style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>
        <Nav />
        <Main />
      </div>
    </Container>
  );
};

export default App;
