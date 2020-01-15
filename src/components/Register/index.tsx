import React, { useState } from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { Container, TextField, Button } from "@material-ui/core";
import { useFela } from "react-fela";

import { setUser } from "../../store/user/actions";
import { setPageHome } from "../../store/page/actions";

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
  const { css } = useFela();

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
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user
          ?.updateProfile({
            displayName
          })
          .then(() => {
            const user = firebase.auth().currentUser;
            firebase
              .firestore()
              .collection("users")
              .doc(user?.uid)
              .set({ displayName, email });
          });
        dispatch(
          setUser({
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
      {error && <div className={css(errorBox)}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={css(spacer)}>
          <TextField
            required
            className={css(input)}
            variant="filled"
            label="First name"
            value={firstName}
            onChange={onFirstNameChange}
          />
        </div>
        <div className={css(spacer)}>
          <TextField
            required
            className={css(input)}
            variant="filled"
            label="Last name"
            value={lastName}
            onChange={onLastNameChange}
          />
        </div>
        <div className={css(spacer)}>
          <TextField
            required
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
            required
            className={css(input)}
            variant="filled"
            label="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className={css(spacer)}>
          <TextField
            required
            className={css(input)}
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
