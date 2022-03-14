import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { LoginForm } from 'containers';
import styles from './LoginBtn.module.css';

const LoginBtn = (props) => {
  const { auth } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  if (auth) {
    return <></>;
  }
  return (
    <>
      <Button className={styles.loginBtn} onClick={handleShow}>
        Play now
      </Button>
      <Modal contentClassName={styles.headerModal} show={show} onHide={handleClose} centered>
        <button className={styles.closeModalBtn} title="Close" onClick={handleClose}>
          &#10006;
        </button>
        <LoginForm callbackCloseModal={handleClose} />
      </Modal>
    </>
  );
};

export default LoginBtn;
