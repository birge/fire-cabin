import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUsers } from "../store/users/actions";
import { db } from "../database";
import { UsersState } from "../store/users/types";

const useUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot(querySnapshot => {
      const users: UsersState = {};
      querySnapshot.forEach(doc => {
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
