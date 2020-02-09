import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { AppState } from "../../store";
import { Reservation } from "../../store/reservations/types";
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
      db.collection("events")
        .doc(reservation.id)
        .delete();
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
