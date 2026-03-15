import React from "react";
import { useSelector } from "react-redux";
import { Page } from "../../store/page/slice";
import { AppState } from "../../store";
import useCurrentUserDetection from "../../hooks/useCurrentUserDetection";

const Calendar = React.lazy(() => import("../Calendar"));
const Profile = React.lazy(() => import("../Profile"));
const LogIn = React.lazy(() => import("../LogIn"));
const Register = React.lazy(() => import("../Register"));

const selectPage = (state: AppState) => state.page;

const Main: React.FC = () => {
  const page = useSelector(selectPage);

  useCurrentUserDetection();

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {(() => {
        switch (page) {
          case Page.HOME:
            return <Calendar />;
          case Page.LOGIN:
            return <LogIn />;
          case Page.REGISTER:
            return <Register />;
          case Page.PROFILE:
            return <Profile />;
          default:
            return null;
        }
      })()}
    </React.Suspense>
  );
};

export default Main;
