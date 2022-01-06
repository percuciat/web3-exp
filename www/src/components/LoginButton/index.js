import React from "react";
import {useSanctum} from "react-sanctum";

const LoginButton = () => {
  const {authenticated, user, signIn} = useSanctum();

  const handleLogin = () => {
    const email = "test@test.ru";
    const password = "qwerty12";
    const remember = true;

    signIn(email, password, remember)
      .then((res) => {
        window.alert("Signed in!");
        console.log('res--', res)
      })
      .catch(() => window.alert("Incorrect email or password"));
  };

  console.log('user--', user);
  console.log('authenticated--', authenticated);
  console.log('signIn--', signIn);

  return (
    authenticated ? <h1>Welcome, {user.name}</h1> : <button onClick={handleLogin}>Sign in</button>
)
};

export default LoginButton;