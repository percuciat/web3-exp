import React, {useState} from "react";
import {Alert} from "react-bootstrap";

const AlertForm = (props) => {
  const [show, setShow] = useState(true);
  let {alertMsg, danger = false} = props;

  // console.log('error ALERT', alertMsg)

  return <>
    {alertMsg && show && <Alert variant={`${danger ? 'danger' : 'success'}`}
                    className="alert-error"
                    onClose={() => setShow(false)}
                    dismissible>
      {
          <span>{typeof alertMsg === 'string' ? alertMsg: alertMsg.flat()}</span>
      }
    </Alert>}
  </>
};

export default AlertForm;