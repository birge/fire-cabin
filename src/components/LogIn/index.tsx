import React, { useState } from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { Container, TextField, Button } from "@material-ui/core";
import { useFela } from "react-fela";

import { setCurrentUser } from "../../store/currentUser/actions";
import { setPageHome } from "../../store/page/actions";

import ForgotPassword from "./ForgotPassword";

const spacer = () => ({
  paddingBottom: "10px"
});

const input = () => ({
  width: "300px"
});

const errorBox = () => ({
  color: "#721c24",
  border: "1px solid transparent",
  backgroundColor: "#f8d7da",
  borderColor: "#f5c6cb",
  borderRadius: "5px 5px 0 0",
  padding: "10px",
  width: "280px",
  marginBottom: "10px"
});

const LogIn: React.FC = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccesMessage] = useState("");
  const dispatch = useDispatch();
  const { css } = useFela();

  const onEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  };

  const changeEmail = (email: string) => {
    setEmail(email);
  };

  const onPasswordChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  };

  const handleSubmit = () => {
    if (!password || !email) return;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(
          setCurrentUser({
            id: user?.uid || "",
            name: user?.displayName || "",
            email: user?.email || "",
            loggedIn: Boolean(user)
          })
        );
        dispatch(setPageHome());
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  const toggleShowForgot = (success: boolean) => {
    if (success) {
      setSuccesMessage("Please check your email to change your password.");
    }

    setShowForgot(prev => !prev);
  };

  return (
    <Container maxWidth="sm">
      {showForgot ? (
        <ForgotPassword
          email={email}
          setEmail={changeEmail}
          toggleForgot={toggleShowForgot}
        />
      ) : (
        <>
          <h1>Sign in</h1>
          {successMessage && <div>{successMessage}</div>}
          {error && <div className={css(errorBox)}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className={css(spacer)}>
              <TextField
                className={css(input)}
                variant="filled"
                label="Email"
                type="email"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className={css(spacer)}>
              <TextField
                className={css(input)}
                variant="filled"
                label="Password"
                type="password"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            <div className={css(spacer)}>
              <Button onClick={() => toggleShowForgot(false)}>
                Forgot password
              </Button>
            </div>
            <Button
              disabled={Boolean(!email || !password)}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default LogIn;
