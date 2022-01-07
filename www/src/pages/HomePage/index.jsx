import React from "react";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectToken} from '../../store/slices/auth'
import apiClient from "../../api";

const HomePage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let user = searchParams.get("code");
  const token = useSelector(selectToken);
  const testHandler = () => {
    apiClient.get('api/mine', {headers: {"Authorization": `Bearer ${token}`}}).then(r => {
      console.log('response', r)
    }).catch(e => {
      console.log('response', e)
    })
  }
  return (<>
      <h1>Home</h1>
      <div>GET PARAMS: {user}</div>
      <button onClick={testHandler}>click</button>
    </>
  )
};

export default HomePage;