import React, { useState, useCallback } from "react";
import LogIn from "./LogIn";
import Register from "./Register";

const SignIn: React.FC = () => {
  const [logIn, setLogIn] = useState(true);

  const toggleLogIn = useCallback(() => setLogIn(prev => !prev), []);

  return logIn ? (
    <LogIn toggle={toggleLogIn} />
  ) : (
    <Register toggle={toggleLogIn} />
  );
};

export default SignIn;
