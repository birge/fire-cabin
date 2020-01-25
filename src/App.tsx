import React from "react";
import Container from "@material-ui/core/Container";

import Main from "./components/Main";
import useUserDetection from "./hooks/useUserDetection";
import useReservations from "./hooks/useReservations";
import Nav from "./components/Nav";

const App: React.FC = () => {
  useUserDetection();
  useReservations();

  return (
    <Container maxWidth="xl">
      <Nav />
      <Main />
    </Container>
  );
};

export default App;
