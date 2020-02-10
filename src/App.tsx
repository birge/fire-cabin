import React from "react";
import Container from "@material-ui/core/Container";

import Main from "./components/Main";
import useCurrentUserDetection from "./hooks/useCurrentUserDetection";
import useReservations from "./hooks/useReservations";
import useUsers from "./hooks/useUsers";
import Nav from "./components/Nav";
import { useFela } from "react-fela";

const fonts = () => ({
  fontFamily: "Roboto, Helvetica, Arial, sans-serif"
});

const App: React.FC = () => {
  const { css } = useFela();
  useCurrentUserDetection();
  useReservations();
  useUsers();

  return (
    <Container maxWidth="xl">
      <div className={css(fonts)}>
        <Nav />
        <Main />
      </div>
    </Container>
  );
};

export default App;
