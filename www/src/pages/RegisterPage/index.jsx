import React, {useLayoutEffect, useState} from "react";
import {Form, Alert} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../../store/slices/auth/action'
import {selectIsAuth, selectErrorsObj} from "../../store/slices/auth";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const auth = useSelector(selectIsAuth);
  const errorsObj = useSelector(selectErrorsObj);

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      setError('passwords dont match!')
    } else {
      dispatch(registerUser({
        email,
        password,
        password_confirmation
      }));
    }
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
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="password_confirmation">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password"
                        placeholder="repeat password"
                        onChange={(e) => setRepeatPassword(e.target.value)}/>
        </Form.Group>
        {error && (
          <Alert variant='danger'>
            This is a {error} alert—check it out!
          </Alert>
         )
        }
        {
          errorsObj && (
            <Alert variant="danger" dismissible>
              <Alert.Heading>{errorsObj.message}</Alert.Heading>
              <p>
                {errorsObj.errors}
              </p>
            </Alert>
          )
        }
        <button className="btn btn-primary" onClick={handleRegister}>Register in</button>
      </Form>
    </div>
  )
};

export default RegisterPage;