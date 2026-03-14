import React, { useState } from "react";
import { isSameDay, isAfter, isBefore } from "date-fns/esm";
import { useSelector } from "react-redux";

import { AppState } from "../../store";
import { Reservation } from "../../store/reservations/types";

import EditEvent from "./EditEvent";

const LANE_HEIGHT = 25;
const LANE_GAP = 5;
const LANE_VERTICAL_STEP = LANE_HEIGHT + LANE_GAP;

const baseStyle: React.CSSProperties = {
  position: "absolute",
  height: LANE_HEIGHT,
  backgroundColor: "#3f51b5",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "12px", // Small text for compact display
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const endStyles: React.CSSProperties = {
  ...baseStyle,
  borderRadius: "0 10px 10px 0",
  left: "-1px",
  right: "15px",
};

const startStyles: React.CSSProperties = {
  ...baseStyle,
  color: "white",
  paddingLeft: "10px",
  borderRadius: "10px 0 0 10px",
  left: "15px",
  right: "-1px",
};

const midStyles: React.CSSProperties = {
  ...baseStyle,
  left: "-1px",
  right: "-1px",
};

function getLaneTop(lane: 0 | 1): number {
  return lane * LANE_VERTICAL_STEP;
}

type EventsProps = {
  day: Date;
  reservationLanes: Map<string, 0 | 1>;
};

const reservationsSelector = (state: AppState) => state.reservations;
const usersSelector = (state: AppState) => state.users;

const Events: React.FC<EventsProps> = React.memo(({ day, reservationLanes }) => {
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
    const lane = reservationLanes.get(reservation.id) ?? 0;
    const top = getLaneTop(lane);

    if (isSameDay(reservation.endDate, day)) {
      events.push(
        <div
          style={{ ...endStyles, top }}
          key={`leave${reservation.id}`}
          onClick={editEvent(reservation)}
        />
      );
    }

    if (isSameDay(reservation.startDate, day)) {
      events.push(
        <div
          style={{ ...startStyles, top }}
          key={`arrive${reservation.id}`}
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
          style={{ ...midStyles, top }}
          key={`occupied${reservation.id}`}
          onClick={editEvent(reservation)}
        />
      );
    }
  });

  return (
    <div style={{ position: "relative", minHeight: LANE_VERTICAL_STEP * 2 }}>
      {!!reservationToEdit && (
        <EditEvent cancel={cancelEditEvent} reservation={reservationToEdit} />
      )}
      {events}
    </div>
  );
});

export default Events;
