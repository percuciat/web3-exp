import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from 'store/slices/auth';
import { Button, Modal } from 'react-bootstrap';
import { OverlayngPortal } from 'highComponents';
import { LoginForm } from 'containers';
import styles from './LoginBtn.module.css';

const LoginBtn = (props) => {
  const { auth } = props;
  /* const isLoading = useSelector(selectIsLoading); */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        <LoginForm callback={handleClose} />
      </Modal>
      {/*  {isLoading && <OverlayngPortal />} */}
    </>
  );
};

export default LoginBtn;
