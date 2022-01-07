import React, {useLayoutEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {registerUser} from '../../store/slices/auth/action'
import {selectIsAuth, selectErrorsObj} from "../../store/slices/auth";
import {useNavigate} from "react-router-dom";
import {Form, Alert} from 'react-bootstrap';
import {AlertForm, Error} from '../../components';
import {Form as FormFinal, Field} from 'react-final-form';


const RegisterPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const required = (value) => (!value && "Required");
  /*const equal = (value) => {
    console.log('value', value)
  }
  const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
  const composeValidators = (...validators) => (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined);*/

  const handleRegister = ({email, password, password_confirmation}) => {
    setError(null)
    if (password !== password_confirmation) {
      setError('passwords mismatched')
    } else {
      dispatch(registerUser({
        email,
        password,
        password_confirmation
      })).then(r => {
        // TODO поменять после исправления ответа
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
    }
  };

  useLayoutEffect(() => {
    if (auth) {
      navigate('/', {replace: true})
    }
  }, [auth]);

  return (
    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <FormFinal onSubmit={handleRegister}>
        {({form, submitting, pristine, values, handleSubmit}) => (
          <Form className="form-login" onSubmit={handleSubmit}>
            <h1>Registration</h1>
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
            <Field name="password_confirmation" validate={required}>
              {
                ({input, meta}) => (
                  <Form.Group>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password"
                                  placeholder="confirm password"
                                  {...input}/>
                    <Error meta={meta}/>
                  </Form.Group>
                )
              }
            </Field>
            <button type="submit" className="btn btn-primary"
                    disabled={submitting || pristine}>
              Register in
            </button>
          </Form>
        )}
      </FormFinal>
      {error && <AlertForm error={error}/>}
    </div>
  )
};

export default RegisterPage;