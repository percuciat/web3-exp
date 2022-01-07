import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';


/*
*
* UserService.session.signTransaction(
    {
        actions: [{
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: UserService.authName,
                permission: 'active'
            }],
            data: {
                from: UserService.authName,
                to: '3dkrenderwax',
                quantity: '1.00000000 WAX',
                memo: 'This works!'
            }
        }]
    },
    {
        blocksBehind: 3,
        expireSeconds: 30
    }

).then((response) => {
    if(response.status === 'executed') {
        UserService.getBalance();
    }
});
*  */


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
