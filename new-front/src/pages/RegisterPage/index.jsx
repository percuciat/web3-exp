import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, sendToken } from '../../store/slices/auth/action';
import { selectIsAuth } from '../../store/slices/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { AlertForm, Error } from '../../components';
import { Form as FormFinal, Field } from 'react-final-form';

const RegisterPage = () => {
  const [backendValidation, setBackendValidation] = useState(null);
  const auth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const required = (value) => !value && 'Required';

  const handleRegister = ({ email, password, password_confirmation }) => {
    setBackendValidation(null);
    dispatch(
      registerUser({
        email,
        password,
        password_confirmation,
      })
    )
      .then((r) => {
        // TODO for async operation - need fix
        if (r.payload.errors) {
          setBackendValidation(r.payload);
        }
      })
      .catch((e) => {
        console.log('err login', e);
      });
  };

  if (auth) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <FormFinal
        onSubmit={handleRegister}
        validate={(values) => {
          const errors = {};
          if (values.password !== values.password_confirmation) {
            errors.password_confirmation = 'Passwords mismatched';
          }
          return errors;
        }}
      >
        {({ form, submitting, pristine, values, handleSubmit }) => (
          <Form className="form-login" onSubmit={handleSubmit}>
            <h1>Registration</h1>
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
            <button type="submit" className="btn btn-primary" disabled={submitting || pristine}>
              Register in
            </button>
          </Form>
        )}
      </FormFinal>
    </div>
  );
};

export default RegisterPage;
