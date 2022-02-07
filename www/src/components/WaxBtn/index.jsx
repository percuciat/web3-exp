import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsActiveUser, updateUser } from 'store/slices/wax';
import { updateAccountBalance, makeTransaction } from 'store/slices/wax/action';

const WaxBtn = ({ ual: { activeUser, activeAuthenticator, logout, showModal } }) => {
  const dispatch = useDispatch();
  const isActiveUserWax = useSelector(selectIsActiveUser);

  /*  useEffect(() => {
    console.log('activeUser--', activeUser);
    if (activeUser && !isActiveUserWax) {
      dispatch(updateUser(activeUser));
      dispatch(updateAccountBalance(activeUser.accountName));
    }
  }, []); */

  /*  const transactionHandler = async () => {
    try {
      await dispatch(makeTransaction(activeUser));
      await dispatch(updateAccountBalance(accountWallet));
    } catch (err) {
      console.log('err', err);
    }
  }; */

  /* const testHandler = () => {
    dispatch(startMine())
      .then((r) => {
        console.log('Res startMine', r);
        dispatch(makeTransaction(activeUser))
          .then((res) => {
            console.log('response transaction', res);
          })
          .catch((e) => {
            console.log('error transaction', e);
          });
      })
      .catch((e) => {
        console.log('EEE', e);
      });
  }; */

  return (
    <>
      {!activeUser && !isActiveUserWax && (
        <button className="ual-btn-wrapper btn btn-primary">
          <span role="button" onClick={showModal} className="ual-generic-button">
            Login Wax
          </span>
        </button>
      )}
      {/*  {accountWallet && (
        <h3 className="ual-subtitle">
          Logged in as <span className="account-name">{accountWallet}</span>
        </h3>
      )}
      {accountBalance && (
        <div className="account-data">
          <h3 className="ual-subtitle">
            Balance: <span className="account-name">{accountBalance}</span>
          </h3>
          <div className="account-block">
            <button className="ual-btn-wrapper btn btn-success">
              <span className="ual-generic-button blue" onClick={transactionHandler}>
                Transfer 1 eos to example
              </span>
            </button>
            {Boolean(activeUser) && Boolean(activeAuthenticator) && (
              <button className="ual-btn-wrapper btn btn-primary">
                <span className="ual-generic-button red" onClick={logout}>
                  Logout
                </span>
              </button>
            )}
          </div>
        </div>
      )} */}
      {/*  <button onClick={testHandler}>Mine</button> */}
    </>
  );
};

export default WaxBtn;
