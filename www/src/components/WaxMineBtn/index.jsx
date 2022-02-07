import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeTransaction } from 'store/slices/wax/action';
import { startMine } from 'store/slices/mine/action';
const WaxMineBtn = ({ ual: { activeUser } }) => {
  const dispatch = useDispatch();
  const testHandler = () => {
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
  };
  return <button onClick={testHandler}>Mine</button>;
};

export default WaxMineBtn;
