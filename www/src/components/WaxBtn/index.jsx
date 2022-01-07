import React from "react";
import { JsonRpc } from 'eosjs'
// import * as Waxjs from '@waxio/waxjs'

/*const defaultState = {
  activeUser: null,
  accountName: '',
  accountBalance: null,
}*/

/*const WaxBtn = () => {
  return (
    <button>dsfds</button>
  )
};*/

const demoTransaction = {
  actions: [{
    account: 'adentokenwam',
    name: 'transfer',
    authorization: [{
      actor: '', // use account that was logged in
      permission: 'owner',
    }],
    data: {
      /*id: 4,
      nonce:	"b2aa7cae7b808ec830e73425399483d7e73d282f299977eb69e414095af369a8",*/
      from: 'percuicatwax',
      to: 'adenmytest11',
      quantity: '1.0000 LABA',
      memo: 'UAL rocks!',
    },
  }],
}


class WaxBtn extends React.Component {
  displayName = 'WaxBtn'

  constructor(props) {
    super(props)
    this.state = {
      /*...defaultState,*/
      activeUser: null,
      accountName: '',
      accountBalance: null,
      rpc: new JsonRpc(`https://waxtestnet.greymass.com:443`)
    }
    this.updateAccountBalance = this.updateAccountBalance.bind(this)
    this.updateAccountName = this.updateAccountName.bind(this)
    this.renderTransferButton = this.renderTransferButton.bind(this)
    this.transfer = this.transfer.bind(this)
    this.renderModalButton = this.renderModalButton.bind(this)
  }

  componentDidUpdate() {
    const {ual: {activeUser}} = this.props
    if (activeUser && !this.state.activeUser) {
      this.setState({activeUser}, this.updateAccountName)
    } else if (!activeUser && this.state.activeUser) {
      this.setState(defaultState)
    }
  }

  async updateAccountName() {
    try {
      const accountName = await this.state.activeUser.getAccountName()
      this.setState({accountName}, this.updateAccountBalance)
    } catch (e) {
      console.warn(e)
    }
  }

  async updateAccountBalance() {
    try {
      const account = await this.state.rpc.get_account(this.state.accountName)
      const accountBalance = account.core_liquid_balance
      this.setState({accountBalance})
    } catch (e) {
      console.warn(e)
    }
  }

  async transfer() {
    const {accountName, activeUser} = this.state;
    console.log('activeUser--', activeUser)
    demoTransaction.actions[0].authorization[0].actor = accountName;
    demoTransaction.actions[0].data.from = accountName;
    try {
      await activeUser.signTransaction(demoTransaction,  {
        blocksBehind: 3,
        expireSeconds: 30
      });
      await this.updateAccountBalance()
    } catch (error) {

      console.warn(error)
    }
  }

  renderModalButton() {
    return (
      <button className='ual-btn-wrapper btn btn-primary'>
        <span
          role='button'
          onClick={this.props.ual.showModal}
          className='ual-generic-button'>Show UAL Modal</span>
      </button>
    )
  }

  renderTransferButton() {
    return (
      <button className='ual-btn-wrapper btn btn-success'>
        <span className='ual-generic-button blue' onClick={this.transfer}>
          {'Transfer 1 eos to example'}
        </span>
      </button>
    )
  }

  renderLogoutBtn = () => {
    const {ual: {activeUser, activeAuthenticator, logout}} = this.props
    if (!!activeUser && !!activeAuthenticator) {
      return (
        <button className='ual-btn-wrapper btn btn-primary'>
          <span className='ual-generic-button red' onClick={logout}>
            {'Logout'}
          </span>
        </button>
      )
    }
  }

  render() {
    const {ual: {activeUser}} = this.props
    const {accountBalance, accountName} = this.state
    const modalButton = !activeUser && this.renderModalButton()
    const loggedIn = accountName ? `Logged in as ${accountName}` : ''
    const myBalance = accountBalance ? `Balance: ${accountBalance}` : ''
    const transferBtn = accountBalance && this.renderTransferButton()
    return (
      <div style={{textAlign: 'center'}}>
        {modalButton}
        <h3 className='ual-subtitle'>{loggedIn}</h3>
        <h4 className='ual-subtitle'>{myBalance}</h4>
        {transferBtn}
        {this.renderLogoutBtn()}
      </div>
    )
  }
}

export default WaxBtn;