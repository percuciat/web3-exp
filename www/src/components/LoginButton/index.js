import React from "react";
import apiClient from '../../api'

const LoginButton = () => {
  /*const handleLogin = () => {
    // TODO delete after normalize auth operation
    const email = "test@test.ru";
    const password = "qwerty12";

    apiClient.post('api/auth/login', {
      email: email,
      password: password
    }).then(response => {
      console.log('token taking', response.data)
      const token = response.data.token;

      apiClient.get('api/user', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res => {
          console.log(res.data);
          /!*setAuth(true)*!/
        }).catch((e) => {
        console.log('ERROR sending token--', e)
      });

    });
  };
  return (
    <button onClick={handleLogin}>Sign in</button>
  )*/
}

export default LoginButton;