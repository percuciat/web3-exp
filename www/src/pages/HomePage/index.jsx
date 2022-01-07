import React from "react";
import {BrowserRouter as Router, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectToken} from '../../store/slices/auth'
import apiClient from "../../api";
import {Anchor} from "ual-anchor";
import {Wax} from "@eosdacio/ual-wax";
import {UALProvider, withUAL} from "ual-reactjs-renderer";
import {WaxBtn} from "../../components";


const waxConfig = {
  chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  rpcEndpoints: [{
    protocol: 'https',
    host: 'waxtestnet.greymass.com',
    port: '443',
  }]
}

const anchor = new Anchor([waxConfig], {
  // Required: The app name, required by anchor-link. Short string identifying the app
  appName: 'my-example-dapp',
})

const wax = new Wax([waxConfig], {
  // Required: The app name, required by anchor-link. Short string identifying the app
  appName: 'my-example-dapp',
})

const MyUALConsumer = withUAL(WaxBtn);



const HomePage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let codeParam = searchParams.get("code");
  const token = useSelector(selectToken);
  if (codeParam) {
    apiClient.post('api/profile/verify', {headers: {"Authorization": `Bearer ${token}`}}).then(r => {
      console.log('response', r)
      // popup success
    }).catch(e => {
      console.log('response', e)
      // popup error
    })
  }

  const testHandler = () => {
    apiClient.get('api/mine', {headers: {"Authorization": `Bearer ${token}`}}).then(r => {
      console.log('response', r)
    }).catch(e => {
      console.log('response', e)
    })
  };


  return (<>
      <h1>Home</h1>
      <div>GET PARAMS: {codeParam}</div>
      <button onClick={testHandler}>Mine</button>
      <UALProvider chains={[wax]} authenticators={[wax, anchor]} appName={'My App'}>
        <MyUALConsumer />
      </UALProvider>,
    </>
  )
};

export default HomePage;