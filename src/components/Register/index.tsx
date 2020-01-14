import React, { useState } from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/actions";
import { setPageHome } from "../../store/page/actions";

const sentenceCase = (str: string): string =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const onSubmit = () => {
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
      });
  };

  const isValid =
    firstName &&
    lastName &&
    password &&
    email &&
    confirmPassword &&
    password === confirmPassword;

  return (
    <div>
      <p>Register</p>
      <label>
        first name <input value={firstName} onChange={onFirstNameChange} />
      </label>
      <label>
        last name <input value={lastName} onChange={onLastNameChange} />
      </label>
      <label>
        email <input type="email" value={email} onChange={onEmailChange} />
      </label>
      <label>
        password{" "}
        <input type="password" value={password} onChange={onPasswordChange} />
      </label>
      <label>
        confirm password{" "}
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
      </label>
      <button disabled={!isValid} onClick={onSubmit}>
        submit
      </button>
    </div>
  );
};

export default Register;
