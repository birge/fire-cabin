import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Button, TextField } from "@material-ui/core";
import { useFela } from "react-fela";
import firebase from "firebase";

import { AppState } from "../../store";

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

const selectCurrentUser = (state: AppState) => state.currentUser;

const Profile: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { css } = useFela();

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

  const handlePasswordReset = () => {
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 8) {
      return setError("Password needs to be at least 8 characters");
    }

    firebase
      .auth()
      .currentUser?.updatePassword(password)
      .then(() => {
        setSuccess("Password reset successfully");
      })
      .catch(e => {
        setError(e.message);
      });
  };

  return (
    <Container>
      <h2>{currentUser.name}</h2>
      <form onSubmit={handlePasswordReset}>
        <div>Change Password:</div>
        {success && <div>{success}</div>}
        {error && <div className={css(errorBox)}>{error}</div>}
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
          disabled={Boolean(!password || !confirmPassword)}
          variant="contained"
          color="primary"
          onClick={handlePasswordReset}
        >
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default Profile;
