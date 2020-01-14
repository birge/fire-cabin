import React, { useState } from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/actions";
import { setPageHome } from "../../store/page/actions";

const LogIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  };

  const onPasswordChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  };

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            id: user?.uid || "",
            name: user?.displayName || "",
            email: user?.email || "",
            loggedIn: Boolean(user)
          })
        );
        dispatch(setPageHome());
      });
  };

  return (
    <div>
      <p>Log in</p>
      <label>
        email <input type="email" value={email} onChange={onEmailChange} />
      </label>
      <label>
        password{" "}
        <input type="password" value={password} onChange={onPasswordChange} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LogIn;
