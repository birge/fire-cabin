import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Container, TextField, Button } from "@mui/material";
import { auth } from "../../database";

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

type ForgotPasswordProps = {
  email: string;
  setEmail: (email: string) => void;
  toggleForgot: (success: boolean) => void;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  email,
  setEmail,
  toggleForgot
}) => {
  const [error, setError] = useState("");

  const onEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  };

  const submitForgot = () => {
    sendPasswordResetEmail(auth, email.trim())
      .then(() => {
        toggleForgot(true);
      })
      .catch(e => {
        setError(e.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <h1>Forgot password</h1>
      {error && <div style={styles.errorBox}>{error}</div>}
      <form onSubmit={submitForgot}>
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
        <Button
          disabled={Boolean(!email)}
          variant="contained"
          color="primary"
          onClick={submitForgot}
        >
          Submit
        </Button>
        <Button onClick={() => toggleForgot(false)}>Cancel</Button>
      </form>
    </Container>
  );
};

export default ForgotPassword;
