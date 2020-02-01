import { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import {
  setCurrentUser,
  removeCurrentUser
} from "../store/currentUser/actions";

const useCurrentUserDetection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
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
