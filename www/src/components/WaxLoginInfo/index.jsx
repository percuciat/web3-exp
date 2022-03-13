import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsActiveUser,
  selectAccountWallet,
  selectAccountBalance,
  setActiveUser,
} from 'store/slices/wax';
import { updateAccountBalance } from 'store/slices/wax/actions';
import { updateUser } from 'store/slices/wax';
import styles from './WaxLoginInfo.module.css';

const WaxLoginInfo = ({ ual: { activeUser, activeAuthenticator, logout, showModal } }) => {
  const dispatch = useDispatch();
  const isActiveUserWax = useSelector(selectIsActiveUser);
  const accountWallet = useSelector(selectAccountWallet);
  const accountBalance = useSelector(selectAccountBalance);

  useEffect(() => {
    console.log('activeUser--', activeUser);
    if (activeUser && !isActiveUserWax) {
      dispatch(updateUser(activeUser));
      dispatch(updateAccountBalance(activeUser.accountName));
    }
  }, [accountWallet, dispatch, accountBalance, activeUser, isActiveUserWax]);
  return (
    <div className={styles.wrapper}>
      {accountWallet && <span className={styles.items}>{accountWallet}</span>}
      {accountBalance && <span className={styles.items}>{accountBalance}</span>}
    </div>
  );
};

export default WaxLoginInfo;
