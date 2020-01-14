import React from "react";
import { useSelector } from "react-redux";

import { HOME, LOGIN, PROFILE, REGISTER } from "../../store/page/types";
import { AppState } from "../../store";
import Calendar from "../Calendar";
import useUserDetection from "../../hooks/useUserDetection";
import LogIn from "../LogIn";
import Register from "../Register";

const selectPage = (state: AppState) => state.page;

const Main: React.FC = () => {
  const page = useSelector(selectPage);

  useUserDetection();

  switch (page) {
    case HOME:
      return <Calendar />;
    case LOGIN:
      return <LogIn />;
    case REGISTER:
      return <Register />;
    case PROFILE:
      return <Calendar />;
  }
};

export default Main;
