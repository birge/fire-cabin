import React, { useState } from "react";
import { useFela } from "react-fela";
import { isSameDay, isAfter, isBefore } from "date-fns/esm";
import { useSelector } from "react-redux";

import { AppState } from "../../store";
import { Reservation } from "../../store/reservations/types";

import EditEvent from "./EditEvent";

const eventStyles = {
  backgroundColor: "#F7A337",
  color: "white",
  paddingLeft: "3px"
};

type EventsProps = {
  day: Date;
};

const reservationsSelector = (state: AppState) => state.reservations;
const usersSelector = (state: AppState) => state.users;

const Events: React.FC<EventsProps> = React.memo(({ day }) => {
  const { css } = useFela();
  const reservations = useSelector(reservationsSelector);
  const users = useSelector(usersSelector);
  const [
    reservationToEdit,
    setReservationToEdit
  ] = useState<Reservation | null>(null);

  const events: JSX.Element[] = [];

  const editEvent = (reservation: Reservation) => () => {
    setReservationToEdit(reservation);
  };

  const cancelEditEvent = () => {
    setReservationToEdit(null);
  };

  reservations.forEach(reservation => {
    if (isSameDay(reservation.endDate, day)) {
      events.push(
        <div
          className={css(eventStyles)}
          key={`arrive${day.getDate()}`}
          onClick={editEvent(reservation)}
        >
          {users[reservation.userId]?.name.split(" ")[0]} leaves
        </div>
      );
    }

    if (isSameDay(reservation.startDate, day)) {
      events.push(
        <div
          className={css(eventStyles)}
          key={`leave${day.getDate()}`}
          onClick={editEvent(reservation)}
        >
          {users[reservation.userId]?.name.split(" ")[0]} arrives
        </div>
      );
    }

    if (
      isAfter(day, reservation.startDate) &&
      isBefore(day, reservation.endDate) &&
      !isSameDay(reservation.startDate, day) &&
      !isSameDay(reservation.endDate, day)
    ) {
      events.push(
        <div
          className={css(eventStyles)}
          key={`occupied${day.getDate()}`}
          onClick={editEvent(reservation)}
        >
          occupied
        </div>
      );
    }
  });

  return (
    <>
      {!!reservationToEdit && (
        <EditEvent cancel={cancelEditEvent} reservation={reservationToEdit} />
      )}
      {events}
    </>
  );
});

export default Events;
