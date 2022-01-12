import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsActiveUser, selectAccountName, selectAccountBalance, setActiveUser } from '../../store/slices/wax'
import { updateAccountName, updateAccountBalance, makeTransaction } from '../../store/slices/wax/action'
import { startMine } from '../../store/slices/mine/action'

const WaxBtn = ({ ual: { activeUser, activeAuthenticator, logout, showModal } }) => {
  const dispatch = useDispatch()
  const isActiveUserWax = useSelector(selectIsActiveUser)
  const accountName = useSelector(selectAccountName)
  const accountBalance = useSelector(selectAccountBalance)

  useEffect(() => {
    if (activeUser && !isActiveUserWax) {
      dispatch(updateAccountName(activeUser))
        .then(responseAccName => {
          dispatch(updateAccountBalance(responseAccName.payload))
        })
        .catch(e => {
          console.log('ERROR, USE effect update', e)
        })
    }/* else if (!activeUser && !isActiveUserWax) {
      console.log('isActiveUserWax NO--', isActiveUserWax)
      dispatch(setActiveUser({
        activeUser: false,
        accountName: '',
        accountBalance: null,
      }));
    } */
  }, [])

  const transactionHandler = async () => {
    dispatch(makeTransaction(activeUser)).then(r => {
      dispatch(updateAccountBalance(accountName))
    }).catch(e => {
      console.log('e', e)
    })
  }

  const testHandler = () => {
    dispatch(startMine()).then(r => {
      console.log('Res startMine', r)
      console.log('Res activeUser', activeUser)
      dispatch(makeTransaction(activeUser)).then(r => {
        console.log('response transaction', r)
      }).catch(e => {
        console.log('error transaction', e)
      })
    }).catch(e => {
      console.log('EEE', e)
    })
  }

  return (
    <div className="account-wrapper">
      {!activeUser && !isActiveUserWax && (
        <button className='ual-btn-wrapper btn btn-primary'>
        <span
          role='button'
          onClick={showModal}
          className='ual-generic-button'>Show UAL Modal</span>
        </button>
      )}
      {accountName && (
        <h3 className='ual-subtitle'>
          Logged in as <span className="account-name">{accountName}</span>
        </h3>
      )}
      {accountBalance && (
        <div className="account-data">
          <h3 className='ual-subtitle'>
            Balance: <span className="account-name">{accountBalance}</span>
          </h3>
          <div className="account-block">
            <button className='ual-btn-wrapper btn btn-success'>
              <span className='ual-generic-button blue' onClick={transactionHandler}>
                Transfer 1 eos to example
              </span>
            </button>
            {!!activeUser && !!activeAuthenticator && (
              <button className='ual-btn-wrapper btn btn-primary'>
                <span className='ual-generic-button red'
                      onClick={logout}>
                  Logout
                </span>
              </button>
            )}
          </div>
        </div>
      )}
      <button onClick={testHandler}>Mine</button>
    </div>
  )
}

export default WaxBtn
