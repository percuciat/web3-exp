import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Form as FormFinal, Field } from 'react-final-form';
import { AlertForm, Error } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, getProfileData } from '../../store/slices/auth/action';
import { startMine } from '../../store/slices/mine/action';
import { selectUserProfile } from '../../store/slices/auth';

const ProfilePage = () => {
  const [backendValidation, setBackendValidation] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const required = (value) => !value && 'Required';
  const dispatch = useDispatch();

  /*
   * TODO update useSelector
   * const userProfile = useSelector(selectUserProfile);
   */

  const handleUpdateProfile = ({ wallet }) => {
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

  useEffect(() => {
    dispatch(getProfileData())
      .then((r) => {
        setUserProfile(r.payload.wallet);
      })
      .catch((e) => {
        console.log('E catch userProfile data', e);
      });
  }, []);

  return (
    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
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
            <h1>Profile update</h1>
            <Field name="wallet" validate={required} initialValue={userProfile}>
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
          </Form>
        )}
      </FormFinal>
      {!backendValidation?.errors && backendValidation?.message && (
        <AlertForm alertMsg={backendValidation.message} />
      )}
    </div>
  );
};

export default ProfilePage;
