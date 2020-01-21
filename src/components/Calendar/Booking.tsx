import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";

import { AppState } from "../../store";

const selectUser = (state: AppState) => state.user;

const Booking: React.FC = () => {
  const [showSelector, setShowSelector] = useState(false);
  const user = useSelector(selectUser);

  const toggleShowSelector = () => setShowSelector(prev => !prev);

  if (!user.loggedIn) {
    return null;
  }
  return (
    <>
      <Button variant="contained" color="primary" onClick={toggleShowSelector}>
        Reserve time
      </Button>
      {showSelector && <span>test</span>}
    </>
  );
};

export default Booking;
