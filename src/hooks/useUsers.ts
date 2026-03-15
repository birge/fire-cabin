import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";

import { setUsers, UsersState } from "../store/users/slice";
import { db } from "../database";

const useUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const users: UsersState = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        users[doc.id] = {
          id: doc.id,
          email: data.email,
          name: data.displayName
        };
      });
      dispatch(setUsers(users));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};

export default useUsers;
