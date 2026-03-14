import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Button, TextField } from "@mui/material";
import { updatePassword } from "firebase/auth";
import { auth } from "../../database";

import { AppState } from "../../store";

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

const selectCurrentUser = (state: AppState) => state.currentUser;

const Profile: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    const user = auth.currentUser;
    if (user) {
      updatePassword(user, password)
        .then(() => {
          setSuccess("Password reset successfully");
        })
        .catch(e => {
          setError(e.message);
        });
    }
  };

  return (
    <Container>
      <h2>{currentUser.name}</h2>
      <form onSubmit={handlePasswordReset}>
        <div>Change Password:</div>
        {success && <div>{success}</div>}
        {error && <div style={styles.errorBox}>{error}</div>}
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
