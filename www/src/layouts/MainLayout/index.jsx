import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Sidebar, Footer } from 'containers';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowSize, selectIsMenuOpen } from 'store/slices/common';
import { useResizeWindow } from 'hooks/useResizeWindow';

const MainLayout = () => {
  const isMenuOpen = useSelector(selectIsMenuOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setWindowSize(window.innerWidth));
  }, [dispatch]);

  useResizeWindow();
  return (
    <>
      <Header />
      {isMenuOpen && <Sidebar />}
      <main className="py-5">
        <section className="container">
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
