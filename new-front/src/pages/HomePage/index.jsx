import React from "react";
import {BrowserRouter as Router, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectToken} from "../../store/slices/auth"

import {makeRequest} from "../../utils/api";
import {Anchor} from "ual-anchor";
import {Wax} from "@eosdacio/ual-wax";
import {UALProvider, withUAL} from "ual-reactjs-renderer";
import {WaxBtn} from "../../components";
import {sendToken} from "../../store/slices/auth/action";

// Wax test
const waxConfig = {
  chainId: "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12",
  rpcEndpoints: [
{
    protocol: "https",
    host: "waxtestnet.greymass.com",
    port: "443"
  }
]
};

const anchor = new Anchor([waxConfig], {
  // Required: The app name, required by anchor-link. Short string identifying the app
  appName: "my-example-dapp"
});

const wax = new Wax([waxConfig], {
  // Required: The app name, required by anchor-link. Short string identifying the app
  appName: "my-example-dapp"
});

const MyUALConsumer = withUAL(WaxBtn);


const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const codeParam = searchParams.get("code");
  if (codeParam) {
    makeRequest("post", {url: "api/profile/verify", data: {}}).
      then((r) => {
        console.log("response", r)
      }).catch((e) => {
        console.log("response", e)
      })
  }

  return <>
      <h1>Home</h1>
      <div>GET PARAMS: {codeParam}</div>
      <UALProvider chains={[wax]} authenticators={[wax, anchor]} appName={"My App"}>
        <MyUALConsumer />
      </UALProvider> 
    </>

};

export default HomePage;
