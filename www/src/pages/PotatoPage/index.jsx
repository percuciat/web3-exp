import React from 'react';
import { WaxMineBtn } from 'components';
import { useOutletContext } from 'react-router-dom';

const PotatoPage = () => {
  const { ual, withUAL } = useOutletContext();
  const MineBtnUAL = withUAL(WaxMineBtn);
  return (
    <>
      <h1>PotatoPage</h1>
      <MineBtnUAL />
    </>
  );
};

export default PotatoPage;
