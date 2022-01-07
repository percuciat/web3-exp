import React, {useState} from "react";
import {Form} from 'react-bootstrap';
import {Form as FormFinal, Field} from 'react-final-form'
import {AlertForm, Error} from "../../components";
import {useDispatch} from "react-redux";
import {updateProfile} from "../../store/slices/auth/action";

const ProfilePage = () => {
  // PUT api/profile/update + token header
  const [error, setError] = useState(null);
  const required = (value) => (!value && "Required");
  const dispatch = useDispatch();

  const handleUpdateProfile = ({wallet}) => {
    setError(null)
    dispatch(updateProfile(wallet)).then(r => {
      console.log('r.payload--', r.payload)
      // TODO поменять после исправления ответа
      if (r.payload) {
        if (typeof r.payload === 'string') {
          setError(r.payload)
        } else if(r.payload.errors) {
          setError({
            msg: r.payload?.message,
            errorsObj: r.payload?.errors
          })
        } else {
          setError(r.payload)
        }
      }
    })
  }
  return (
    <>
      <FormFinal onSubmit={handleUpdateProfile}>
        {({form, submitting, pristine, values, handleSubmit}) => (
          <Form className="form-login" onSubmit={handleSubmit}>
            <h1>Profile update</h1>
            <Field name="wallet" validate={required}>
              {
                ({input, meta}) => (
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Authorize with wax cloud wallet</Form.Label>
                    <Form.Control className="form-control" type="text"
                                  placeholder="uo.bi.wam"
                                  {...input}/>
                    <Error meta={meta}/>
                  </Form.Group>
                )
              }
            </Field>
            <button type="submit" className="btn btn-dark"
                    disabled={submitting || pristine}>
              Update profile
            </button>
          </Form>
        )}
      </FormFinal>
      {
        error && <AlertForm error={error}/>
      }
    </>
  )
};

export default ProfilePage;