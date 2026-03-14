import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { Container, TextField, Button } from "@mui/material";
import { auth, db } from "../../database";

import { setCurrentUser } from "../../store/currentUser/actions";
import { setPageHome } from "../../store/page/actions";

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

const sentenceCase = (str: string): string =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const onFirstNameChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(target.value);
  };

  const onLastNameChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(target.value);
  };

  const onEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  };

  const onPasswordChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  };

  const onConfirmPasswordChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(target.value);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 8) {
      return setError("Password needs to be at least 8 characters");
    }

    const displayName = `${sentenceCase(firstName)} ${sentenceCase(lastName)}`;
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, {
          displayName
        }).then(() => {
          if (user?.uid) {
            setDoc(doc(db, "users", user.uid), { displayName, email });
          }
        });
        dispatch(
          setCurrentUser({
            id: user?.uid || "",
            loggedIn: true,
            name: displayName,
            email
          })
        );
        dispatch(setPageHome());
      })
      .catch(({ code }) => {
        if (code === "auth/invalid-email") {
          return setError("Invalid email");
        }

        if (code === "auth/email-already-in-use") {
          return setError("Email already in use");
        }
      });
  };

  const isValid = firstName && lastName && password && email && confirmPassword;

  return (
    <Container maxWidth="sm">
      <h1>Register</h1>
      {error && <div style={styles.errorBox}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={styles.spacer}>
          <TextField
            required
            style={styles.input}
            variant="filled"
            label="First name"
            value={firstName}
            onChange={onFirstNameChange}
          />
        </div>
        <div style={styles.spacer}>
          <TextField
            required
            style={styles.input}
            variant="filled"
            label="Last name"
            value={lastName}
            onChange={onLastNameChange}
          />
        </div>
        <div style={styles.spacer}>
          <TextField
            required
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
            required
            style={styles.input}
            variant="filled"
            label="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div style={styles.spacer}>
          <TextField
            required
            style={styles.input}
            variant="filled"
            label="Confrim password"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />
        </div>
        <Button
          disabled={!isValid}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Register;
