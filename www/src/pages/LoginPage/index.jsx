import React, {useLayoutEffect, useState} from "react";
import {Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {loginUser, sendToken} from '../../store/slices/auth/action'
import {selectIsAuth} from "../../store/slices/auth";
import {useNavigate, Navigate} from "react-router-dom";
import {Error, AlertForm} from '../../components';
import {Form as FormFinal, Field} from 'react-final-form'


//  test@test.ru
// qwerty12

const LoginPage = () => {
  const [backendValidation, setBackendValidation] = useState(null);
  const required = (value) => (!value && "Required");
  const navigate = useNavigate();
  const auth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const handleLogin = ({email, password}) => {
    setBackendValidation(null)
    dispatch(loginUser({
      email,
      password
    })).then(r => {
      // TODO for async operation - need fix
      if(r.payload.errors) {
        setBackendValidation(r.payload)
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

  if(auth) {
    return <Navigate to="/" replace={true}/>
  }

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
                    {
                      backendValidation?.errors &&
                      <AlertForm danger={true} alertMsg={backendValidation.errors['email']}/>
                    }
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
                    {
                      backendValidation?.errors &&
                      <AlertForm danger={true} alertMsg={backendValidation.errors['password']}/>
                    }
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
    </div>
  )
};

export default LoginPage;