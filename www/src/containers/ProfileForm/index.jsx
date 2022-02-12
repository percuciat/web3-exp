import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Form as FormFinal, Field, useField } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { updateProfile } from 'store/slices/auth/action';
import { Error, AlertForm } from 'components';

const ProfileForm = (props) => {
  const { userProfile } = props;
  const walletProfile = userProfile?.wallet;
  const [backendValidation, setBackendValidation] = useState(null);
  const required = (value) => !value && 'Required';
  const dispatch = useDispatch();

  const handleUpdateProfile = (formData) => {
    const { wallet } = formData;
    setBackendValidation(null);
    dispatch(updateProfile(wallet))
      .then((r) => {
        // TODO for async operation - need fix
        console.log('respone update profile', r);
        if (r.payload) {
          setBackendValidation(r.payload);
        }
      })
      .catch((e) => {
        console.log('error update PROFILE--', e);
      });
  };

  return (
    <>
      <FormFinal
        onSubmit={handleUpdateProfile}
        validate={(values) => {
          const errors = {};
          const minStrLength = 11;
          if (values.wallet && values.wallet.length < minStrLength) {
            errors.wallet = `Wallet must be more than ${values.wallet.length} chars.`;
          }
          return errors;
        }}
      >
        {({ form, submitting, pristine, values, handleSubmit }) => (
          <Form className="form-login" onSubmit={handleSubmit}>
            <Field name="wallet" validate={required} initialValue={walletProfile}>
              {({ input, meta }) => (
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Authorize with wax cloud wallet</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="wallet.wam"
                    {...input}
                  />
                  <Error meta={meta} />
                  {backendValidation?.errors && (
                    <AlertForm danger={true} alertMsg={backendValidation.errors.wallet} />
                  )}
                </Form.Group>
              )}
            </Field>
            <button type="submit" className="btn btn-dark" disabled={submitting || pristine}>
              Update profile
            </button>
            {!backendValidation?.errors && backendValidation?.message && (
              <AlertForm alertMsg={backendValidation.message} />
            )}
          </Form>
        )}
      </FormFinal>
    </>
  );
};

export default ProfileForm;
