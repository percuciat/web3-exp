import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser, sendToken } from '../../store/slices/auth/action';
import { selectIsAuth } from '../../store/slices/auth';
import { Error, AlertForm } from '../../components';
import { Form as FormFinal, Field } from 'react-final-form';

const LoginForm = () => {
  const [active, setActive] = useState({
    name: 'login',
  });
  const [backendValidation, setBackendValidation] = useState(null);

  const required = (value) => !value && 'Required';
  const validationMatchPassword = (values) => {
    const errors = {};
    if (values.password !== values.password_confirmation) {
      errors.password_confirmation = 'Passwords mismatched';
    }
    return errors;
  };

  const auth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const handleAuthorize = (values) => {
    setBackendValidation(null);
    let requestAuthorize;
    if (active.name === 'login') {
      requestAuthorize = loginUser({
        email: values.email,
        password: values.password,
      });
    } else {
      requestAuthorize = registerUser({
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
    }

    dispatch(requestAuthorize)
      .then((r) => {
        //TODO: for async operation - need fix
        console.log('register', r);
        if (r.payload.errors) {
          setBackendValidation(r.payload);
        }
      })
      .catch((e) => {
        console.log('err login', e);
      });
  };

  return (
    <FormFinal
      onSubmit={handleAuthorize}
      validate={active.name !== 'login' ? validationMatchPassword : ''}
    >
      {({ form, submitting, pristine, values, handleSubmit }) => (
        <Form className="form-login" onSubmit={handleSubmit}>
          <div className={styles.wrapperTitle}>
            <button onClick={() => setActive({ name: 'login' })}>Login</button>
            <button onClick={() => setActive({ name: 'registration' })}>Registration</button>
          </div>
          <Field name="email" validate={required}>
            {({ input, meta }) => (
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" {...input} />
                <Error meta={meta} />
                {backendValidation?.errors && (
                  <AlertForm danger={true} alertMsg={backendValidation.errors.email} />
                )}
              </Form.Group>
            )}
          </Field>
          <Field name="password" validate={required}>
            {({ input, meta }) => (
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" {...input} />
                <Error meta={meta} />
                {backendValidation?.errors && (
                  <AlertForm danger={true} alertMsg={backendValidation.errors.password} />
                )}
              </Form.Group>
            )}
          </Field>
          {active.name !== 'login' ? (
            <Field name="password_confirmation" validate={required}>
              {({ input, meta }) => (
                <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control type="password" placeholder="confirm password" {...input} />
                  <Error meta={meta} />
                  {backendValidation?.errors && (
                    <AlertForm
                      danger={true}
                      alertMsg={backendValidation.errors.password_confirmation}
                    />
                  )}
                </Form.Group>
              )}
            </Field>
          ) : null}
          <button type="submit" className="btn btn-primary" disabled={submitting || pristine}>
            Sign in
          </button>
        </Form>
      )}
    </FormFinal>
  );
};

export default LoginForm;
