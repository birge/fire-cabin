import React from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/user/actions";

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    firebase.auth().signOut();
    dispatch(removeUser());
  };

  return (
    <div>
      test
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default Calendar;
