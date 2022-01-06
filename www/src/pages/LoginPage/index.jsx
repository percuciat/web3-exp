import React, {useLayoutEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../store/slices/auth/action'
import {selectIsAuth} from "../../store/slices/auth";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
   dispatch(loginUser({
     email,
     password
   }));

    /*const email = "test@test.ru";
    const password = "qwerty12";*/

   /* apiClient.post('api/auth/login', {
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

    });*/
  };

  useLayoutEffect(() => {
    if (auth) {
      navigate('/', { replace: true })
    }
  }, [auth]);

  return (
    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <Form className="form-login">
        <h1>Please login</h1>
        <Form.Group controlId="form.Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="form.Password">
          <Form.Label>Name</Form.Label>
          <Form.Control type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <button onClick={handleLogin}>Sign in</button>
      </Form>
    </div>
  )
};

export default LoginPage;