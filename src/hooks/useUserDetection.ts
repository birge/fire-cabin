import { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import { setUser, removeUser } from "../store/user/actions";

const useUserDetection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName || "",
            email: user.email || "",
            id: user.uid,
            loggedIn: true
          })
        );
      } else {
        dispatch(removeUser());
      }
    });
  }, [dispatch]);
};

export default useUserDetection;
