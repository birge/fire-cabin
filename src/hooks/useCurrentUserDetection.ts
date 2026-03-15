import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {
  setCurrentUser,
  removeCurrentUser
} from "../store/currentUser/slice";
import { auth } from "../database";

const useCurrentUserDetection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, function(user) {
      if (user) {
        dispatch(
          setCurrentUser({
            name: user.displayName || "",
            email: user.email || "",
            id: user.uid,
            loggedIn: true
          })
        );
      } else {
        dispatch(removeCurrentUser());
      }
    });
  }, [dispatch]);
};

export default useCurrentUserDetection;
