import React, {useLayoutEffect, useState} from "react";
import {Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from '../../store/slices/auth/action'
import {selectIsAuth} from "../../store/slices/auth";
import {useNavigate} from "react-router-dom";
import {Error, AlertForm} from '../../components';
import {Form as FormFinal, Field} from 'react-final-form'


//  test@test.ru
// qwerty12

const LoginPage = () => {
  const [error, setError] = useState(null);
  const required = (value) => (!value && "Required");
  const navigate = useNavigate();
  const auth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const handleLogin = ({email, password}) => {
    setError(null)
    dispatch(loginUser({
      email,
      password
    })).then(r => {
      // TODO поменять после исправления ответа
      console.log('r.payload--', r.payload)
      if (r.payload) {
        if (typeof r.payload === 'string') {
          setError(r.payload)
        } else {
          setError({
            msg: r.payload?.message,
            errorsObj: r.payload?.errors
          })
        }
      }
    }).catch(e => {
      console.log('err login', e)
    })
  };

  useLayoutEffect(() => {
    if (auth) {
      navigate('/', {replace: true})
    }
  }, [auth]);

  return (
    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <FormFinal onSubmit={handleLogin}>
        {({form, submitting, pristine, values, handleSubmit}) => (
          <Form className="form-login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Field name="email" validate={required}>
              {
                ({input, meta}) => (
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                                  placeholder="name@example.com"
                                  {...input}/>
                    <Error meta={meta}/>
                  </Form.Group>
                )
              }
            </Field>
            <Field name="password" validate={required}>
              {
                ({input, meta}) => (
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                                  placeholder="password"
                                  {...input}/>
                    <Error meta={meta}/>
                  </Form.Group>
                )
              }
            </Field>
            <button type="submit" className="btn btn-primary"
                    disabled={submitting || pristine}>
              Sign in
            </button>
          </Form>
        )}
      </FormFinal>
      {
        error && <AlertForm error={error}/>
      }
    </div>
  )
};

export default LoginPage;