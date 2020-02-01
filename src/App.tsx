import React from "react";
import Container from "@material-ui/core/Container";

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
      <Nav />
      <Main />
    </Container>
  );
};

export default App;
