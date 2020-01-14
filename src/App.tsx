import React from "react";
import Container from "@material-ui/core/Container";

import Main from "./components/Main";
import useUserDetection from "./hooks/useUserDetection";
import Nav from "./components/Nav";

const App: React.FC = () => {
  useUserDetection();

  return (
    <Container maxWidth="xl">
      <Nav />
      <Main />
    </Container>
  );
};

export default App;
