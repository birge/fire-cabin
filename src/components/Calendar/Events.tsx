import React from "react";
import { useFela } from "react-fela";
import { isSameDay, isAfter, isBefore } from "date-fns/esm";
import { useSelector } from "react-redux";

import { AppState } from "../../store";

const eventStyles = {
  backgroundColor: "#F7A337",
  color: "white",
  paddingLeft: "3px"
};

type Events = {
  day: Date;
};

const reservationsSelector = (state: AppState) => state.reservations;
const usersSelector = (state: AppState) => state.users;

const Events: React.FC<Events> = React.memo(({ day }) => {
  const { css } = useFela();
  const reservations = useSelector(reservationsSelector);
  const users = useSelector(usersSelector);

  const events: JSX.Element[] = [];

  reservations.forEach(reservation => {
    if (isSameDay(reservation.endDate, day)) {
      events.push(
        <div className={css(eventStyles)} key={`arrive${day.getDate()}`}>
          {users[reservation.userId]?.name} leaves
        </div>
      );
    }

    if (isSameDay(reservation.startDate, day)) {
      events.push(
        <div className={css(eventStyles)} key={`leave${day.getDate()}`}>
          {users[reservation.userId]?.name} arrives
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
        <div className={css(eventStyles)} key={`occupied${day.getDate()}`}>
          occupied
        </div>
      );
    }
  });

  return <>{events}</>;
});

export default Events;
