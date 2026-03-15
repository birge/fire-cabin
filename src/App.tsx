import React from "react";
import Container from "@mui/material/Container";

import Main from "./components/Main";
import useCurrentUserDetection from "./hooks/useCurrentUserDetection";
import useReservations from "./hooks/useReservations";
import useUsers from "./hooks/useUsers";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Nav from "./components/Nav";

const App: React.FC = () => {
  useCurrentUserDetection();
  useReservations();
  useUsers();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Nav />
        <Main />
      </Container>
    </ThemeProvider>
  );
};

export default App;
