import React from 'react';
import { BrowserRouter as Router, useSearchParams } from 'react-router-dom';
import { makeRequest } from 'utils/api';
import { About } from './partials';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const codeParam = searchParams.get('code');
  if (codeParam) {
    makeRequest('post', { url: 'api/profile/verify', data: {} })
      .then((r) => {
        console.log('response', r);
      })
      .catch((e) => {
        console.log('response', e);
      });
  }

  return (
    <>
      {/* <h1>Home</h1>
        <div>GET PARAMS: {codeParam}</div> */}
      <About />
    </>
  );
};

export default HomePage;
