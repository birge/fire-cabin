import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { AppState } from "../store";
import { setReservations } from "../store/reservations/slice";
import { db } from "../database";

const dateSelector = (state: AppState) => state.dates;

const useReservations = () => {
  const dispatch = useDispatch();
  const dates = useSelector(dateSelector);

  useEffect(() => {
    const q = query(
      collection(db, "events"),
      where("year", "==", dates.year)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const events: any[] = [];
      querySnapshot.forEach((doc) => {
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
