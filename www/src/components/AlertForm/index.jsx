import React, {useState} from "react";
import {Alert} from "react-bootstrap";

const AlertForm = (props) => {
  const [show, setShow] = useState(true);
  let {error} = props;
  // TODO поправить запрос с бэка
  // console.log('error ALERT', error)

  return <>
    {show && <Alert variant={`${error.errorsObj ? 'danger' : 'success'}`}
                    className="alert-error"
                    onClose={() => setShow(false)}
                    dismissible>
      {
        typeof error === 'string' ?
        <span>{error}</span> :
          (!error.errorsObj ?
            <span>{error.message}</span> :
            Object.entries(error.errorsObj).map(([keyObj, valObj]) => {
              return (
                <span key={keyObj}>{valObj.flat()}</span>
              )
          }))
      }
    </Alert>}
  </>
};

export default AlertForm;