import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, AppBar, Toolbar, Button } from "@mui/material";
import { auth } from "../../database";

import { AppState } from "../../store";
import { Page, setPage } from "../../store/page/slice";
import { removeCurrentUser } from "../../store/currentUser/slice";


const selectCurrentUser = (state: AppState) => state.currentUser;

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const login = () => {
    dispatch(setPage(Page.LOGIN));
  };

  const register = () => {
    dispatch(setPage(Page.REGISTER));
  };

  const logout = () => {
    auth.signOut();
    dispatch(removeCurrentUser());
  };

  const profile = () => {
    dispatch(setPage(Page.PROFILE));
  };

  const home = () => {
    dispatch(setPage(Page.HOME));
  };


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={home}
        >
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
