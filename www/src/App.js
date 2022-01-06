import React from "react";
import {useRoutes} from "react-router-dom";
import routes from './routes'

const App = () => {
  const elementPage = useRoutes(routes);
  return (
    <div className="my-application">
      {elementPage}
    </div>
  )
};

export default App;
