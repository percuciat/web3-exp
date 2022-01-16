import React from "react";
import {Alert} from "react-bootstrap";

const Error = (props) => {
  const {meta} = props;
  return (
    <>
        {meta.touched && meta.error &&
          <Alert variant="danger" className="alert-error">
            <span>{meta.error}</span>
          </Alert>
        }
    </>
  )
};

export default Error;
