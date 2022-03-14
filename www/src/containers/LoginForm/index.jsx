import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from 'store/slices/auth/actions';
import { Error, AlertForm, Title } from 'components';
import { Form as FormFinal, Field } from 'react-final-form';
import { useLoginUserMutation, useRegisterUserMutation } from 'store/slices/auth';
import { getUserData } from 'store/slices/user/actions';
import styles from './LoginForm.module.css';

const LoginForm = (props) => {
  const { callbackCloseModal } = props;
  const [active, setActive] = useState({
    name: 'login',
  });
  const [backendValidation, setBackendValidation] = useState(null);
  const dispatch = useDispatch();
  const required = (value) => !value && 'Required';
  const validationMatchPassword = (values) => {
    const errors = {};
    if (values.password !== values.password_confirmation) {
      errors.password_confirmation = 'Passwords mismatched';
    }
    return errors;
  };
  /*const [loginUser, { isLoading, isSuccess, isError }] = useLoginUserMutation();
  const [
    registerUser,
    { isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister },
  ] = useRegisterUserMutation();

  const handleAuthorize = async (values) => {
    setBackendValidation(null);
    let requestAuthorize;
    if (active.name === 'login') {
      await loginUser({
        email: values.email,
        password: values.password,
      }).unwrap();
    } else {
      await registerUser({
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      }).unwrap();
    }

    dispatch(requestAuthorize)
      .then((r) => {
        console.log('login form:', r);
        if (r.payload.errors) {
          setBackendValidation(r.payload);
        } else {
          callback();
        }
      })
      .catch((e) => {
        console.log('err login', e);
      });
  };*/

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
        console.log('login form:', r);
        if (r.payload.errors) {
          setBackendValidation(r.payload);
        } else {
          dispatch(getUserData());
          callbackCloseModal();
        }
      })
      .catch((e) => {
        console.log('err login', e);
      });
  };

  return (
    <>
      {/*  <Title text="Sign up" /> */}
      <div className={styles.wrapperForm}>
        <div className={styles.wrapperTitle}>
          Please
          <button
            className={`${styles.loginBtn} ${active.name === 'login' ? styles.active : ''}`}
            onClick={() => setActive({ name: 'login' })}
          >
            Login
          </button>
          or
          <button
            className={`${styles.loginBtn} ${active.name !== 'login' ? styles.active : ''}`}
            onClick={() => setActive({ name: 'registration' })}
          >
            Registration
          </button>
        </div>
        <FormFinal
          onSubmit={handleAuthorize}
          validate={active.name !== 'login' ? validationMatchPassword : ''}
        >
          {({ form, submitting, pristine, values, handleSubmit }) => (
            <Form className={styles.formLogin} onSubmit={handleSubmit}>
              <Field name="email" validate={required}>
                {({ input, meta }) => (
                  <Form.Group>
                    <Form.Label className={styles.formLabel}>Email address</Form.Label>
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
                    <Form.Label className={styles.formLabel}>Password</Form.Label>
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
                      <Form.Label className={styles.formLabel}>Confirm password</Form.Label>
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
      </div>
    </>
  );
};

export default LoginForm;
