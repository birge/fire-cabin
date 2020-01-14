import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFela } from "react-fela";
import firebase from "firebase";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";

import { AppState } from "../../store";
import {
  setPageLogin,
  setPageRegister,
  setPageProfile
} from "../../store/page/actions";
import { removeUser } from "../../store/user/actions";

const TitleStyles = () => ({
  flexGrow: 1
});

const selectUser = (state: AppState) => state.user;

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { css } = useFela();

  const login = () => {
    dispatch(setPageLogin());
  };

  const register = () => {
    dispatch(setPageRegister());
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch(removeUser());
  };

  const profile = () => {
    dispatch(setPageProfile());
  };

  return (
    <div className={css(TitleStyles)}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={css(TitleStyles)}>
            Townly Cabin
          </Typography>
          {user.loggedIn ? (
            <>
              <Button color="inherit" onClick={profile}>
                {user.name}
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
    </div>
  );
};

export default NavBar;
