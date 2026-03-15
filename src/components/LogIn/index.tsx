import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Container, TextField, Button } from "@mui/material";
import { auth } from "../../database";

import { Page, setPage } from "../../store/page/slice";
import { setCurrentUser } from "../../store/currentUser/slice";


import ForgotPassword from "./ForgotPassword";

const styles = {
  spacer: { paddingBottom: "10px" } as React.CSSProperties,
  input: { width: "300px" } as React.CSSProperties,
  errorBox: {
    color: "#721c24",
    border: "1px solid transparent",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    borderRadius: "5px 5px 0 0",
    padding: "10px",
    width: "280px",
    marginBottom: "10px"
  } as React.CSSProperties
};

const LogIn: React.FC = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccesMessage] = useState("");
  const dispatch = useDispatch();

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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setCurrentUser({
            id: user.uid,
            email: user.email || "",
            loggedIn: true,
            name: user.displayName || "",
          })
        );
        dispatch(setPage(Page.HOME));
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
          {error && <div style={styles.errorBox}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={styles.spacer}>
              <TextField
                style={styles.input}
                variant="filled"
                label="Email"
                type="email"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div style={styles.spacer}>
              <TextField
                style={styles.input}
                variant="filled"
                label="Password"
                type="password"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            <div style={styles.spacer}>
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
