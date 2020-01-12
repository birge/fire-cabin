import React from "react";
import { useSelector } from "react-redux";

import { AppState } from "./store";
import Calendar from "./components/Calendar";
import SignIn from "./components/SignIn";
import useUserDetection from "./hooks/useUserDetection";

const selectUser = (state: AppState) => state.user;

const App: React.FC = () => {
  const user = useSelector(selectUser);

  useUserDetection();

  if (user.loggedIn) {
    return <Calendar />;
  }

  return <SignIn />;
};

export default App;
