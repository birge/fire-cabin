import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFela } from "react-fela";
import firebase from "firebase";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";

import { AppState } from "../../store";
import {
  setPageLogin,
  setPageRegister,
  setPageProfile,
  setPageHome
} from "../../store/page/actions";
import { removeCurrentUser } from "../../store/currentUser/actions";

const TitleStyles = () => ({
  flexGrow: 1,
  cursor: "pointer"
});

const selectCurrentUser = (state: AppState) => state.currentUser;

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { css } = useFela();

  const login = () => {
    dispatch(setPageLogin());
  };

  const register = () => {
    dispatch(setPageRegister());
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch(removeCurrentUser());
  };

  const profile = () => {
    dispatch(setPageProfile());
  };

  const home = () => {
    dispatch(setPageHome());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={css(TitleStyles)} onClick={home}>
          Townly Cabin
        </Typography>
        {currentUser.loggedIn ? (
          <>
            <Button color="inherit" onClick={profile}>
              {currentUser.name}
            </Button>
            <Button color="inherit" onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={login}>
              Log in
            </Button>
            <Button color="inherit" onClick={register}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
