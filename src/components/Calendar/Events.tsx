import React, { useState } from "react";
import { useFela } from "react-fela";
import { isSameDay, isAfter, isBefore } from "date-fns/esm";
import { useSelector } from "react-redux";

import { AppState } from "../../store";
import { Reservation } from "../../store/reservations/types";

import EditEvent from "./EditEvent";

const endStyles = {
  backgroundColor: "#3f51b5",
  paddingRight: "15px",
  height: "25px",
  display: "flex",
  borderRadius: "0 10px 10px 0",
  marginLeft: "-1px",
  marginRight: "15px",
  marginBottom: "10px",
};

const startStyles = {
  backgroundColor: "#3f51b5",
  color: "white",
  display: "flex",
  alignItems: "center",
  marginLeft: "15px",
  marginRight: "-1px",
  minHeight: "25px",
  paddingLeft: "15px",
  borderRadius: "10px 0 0 10px",
};

const midStyles = {
  display: "flex",
  marginLeft: "-2px",
  marginRight: "-2px",
  height: "25px",
  backgroundColor: "#3f51b5",
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
  const [reservationToEdit, setReservationToEdit] =
    useState<Reservation | null>(null);

  const events: JSX.Element[] = [];

  const editEvent = (reservation: Reservation) => () => {
    setReservationToEdit(reservation);
  };

  const cancelEditEvent = () => {
    setReservationToEdit(null);
  };

  reservations.forEach((reservation) => {
    if (isSameDay(reservation.endDate, day)) {
      events.unshift(
        <div
          className={css(endStyles)}
          key={`leave${day.getDate()}`}
          onClick={editEvent(reservation)}
        />
      );
    }

    if (isSameDay(reservation.startDate, day)) {
      events.push(
        <div
          className={css(startStyles)}
          key={`arrive${day.getDate()}`}
          onClick={editEvent(reservation)}
        >
          {users[reservation.userId]?.name.split(" ")[0]}'s reservation
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
          className={css(midStyles)}
          key={`occupied${day.getDate()}`}
          onClick={editEvent(reservation)}
        />
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
