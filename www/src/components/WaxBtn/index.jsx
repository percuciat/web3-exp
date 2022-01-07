import React from "react";
// import * as Waxjs from '@waxio/waxjs'

const defaultState = {
  activeUser: null,
  accountName: '',
  accountBalance: null,
}

/*const WaxBtn = () => {
  return (
    <button>dsfds</button>
  )
};*/

class WaxBtn extends React.Component {
  displayName = 'WaxBtn'

  constructor(props) {
    super(props)
    this.state = {
      ...defaultState,
      // rpc: new JsonRpc(`${EXAMPLE_ENV.RPC_PROTOCOL}://${EXAMPLE_ENV.RPC_HOST}:${EXAMPLE_ENV.RPC_PORT}`)
      rpc: ''/*new Waxjs(`https://wax.greymass.com:443`)*/
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
    const {accountName, activeUser} = this.state
    demoTransaction.actions[0].authorization[0].actor = accountName
    demoTransaction.actions[0].data.from = accountName
    try {
      await activeUser.signTransaction(demoTransaction, {broadcast: true})
      await this.updateAccountBalance()
    } catch (error) {
      console.warn(error)
    }
  }

  renderModalButton() {
    return (
      <p className='ual-btn-wrapper'>
        <span
          role='button'
          onClick={this.props.ual.showModal}
          className='ual-generic-button'>Show UAL Modal</span>
      </p>
    )
  }

  renderTransferButton() {
    return (
      <p className='ual-btn-wrapper'>
        <span className='ual-generic-button blue' onClick={this.transfer}>
          {'Transfer 1 eos to example'}
        </span>
      </p>
    )
  }

  renderLogoutBtn = () => {
    const {ual: {activeUser, activeAuthenticator, logout}} = this.props
    if (!!activeUser && !!activeAuthenticator) {
      return (
        <p className='ual-btn-wrapper'>
          <span className='ual-generic-button red' onClick={logout}>
            {'Logout'}
          </span>
        </p>
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