import React, { useState } from "react";
import firebase from "firebase";
import { Container, TextField, Button } from "@material-ui/core";
import { useFela } from "react-fela";

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
  const { css } = useFela();

  const onEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  };

  const submitForgot = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
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
      {error && <div className={css(errorBox)}>{error}</div>}
      <form onSubmit={submitForgot}>
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
