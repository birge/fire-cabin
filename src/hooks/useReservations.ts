import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../store";
import { setReservations } from "../store/reservations/actions";
import { db } from "../database";
import { ReservationState } from "../store/reservations/types";

const dateSelector = (state: AppState) => state.dates;

const useReservations = () => {
  const dispatch = useDispatch();
  const dates = useSelector(dateSelector);

  useEffect(() => {
    const unsubscribe = db
      .collection("events")
      .where("year", "==", dates.year)
      .onSnapshot(querySnapshot => {
        const events: ReservationState = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          events.push({
            id: doc.id,
            userId: data.userId,
            startDate: new Date(data.startDate.seconds * 1000),
            endDate: new Date(data.endDate.seconds * 1000)
          });
        });
        dispatch(setReservations(events));
      });
    return () => {
      unsubscribe();
    };
  }, [dates.year, dispatch]);
};

export default useReservations;
