import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { doc, deleteDoc } from "firebase/firestore";

import { AppState } from "../../store";
import { Reservation } from "../../store/reservations/slice";
import { db } from "../../database";

type EditEventProps = {
  cancel: () => void;
  reservation: Reservation;
};

const currentUserSelect = (state: AppState) => state.currentUser;
const usersSelector = (state: AppState) => state.users;

const EditEvent: React.FC<EditEventProps> = React.memo(
  ({ cancel, reservation }) => {
    const currentUser = useSelector(currentUserSelect);
    const users = useSelector(usersSelector);
    const isCurrentUserEvent = currentUser.id === reservation.userId;
    const reservationUser = users[reservation.userId];

    const handleDelete = () => {
      deleteDoc(doc(db, "events", reservation.id));
      cancel();
    };

    return (
      <Dialog
        open
        onClose={cancel}
        aria-labelledby="Edit Reservation"
        aria-describedby="Modal to edit a reservation"
      >
        <DialogTitle>Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {reservationUser.name} arrives on{" "}
            {format(reservation.startDate, "MMMM do, y")} and leaves on{" "}
            {format(reservation.endDate, "MMMM do, y")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Close
          </Button>
          {isCurrentUserEvent && (
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Delete Reservation
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
);

export default EditEvent;
