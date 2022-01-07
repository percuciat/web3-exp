import React from "react";
import {Outlet} from "react-router-dom";
import {Header} from "../../containers";

const MainLayout = () => {
  return (
    <section>
      <Header/>
      <main className="py-4">
        <div className="container">
          <Outlet/>
        </div>
      </main>
    </section>
  );
};

export default MainLayout;