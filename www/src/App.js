import React, {useEffect} from "react";
import {useRoutes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendToken} from "./store/slices/auth/action";
import {selectIsAuth, selectUserData} from "./store/slices/auth/";
import routes from './routes'

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuth);
  const user = useSelector(selectUserData);
  const elementPage = useRoutes(routes);
  useEffect(() => {
    if (auth && !user) {
      dispatch(sendToken())
    }
  }, []);
  return (
    <div className="wrapperGlobal">
      {elementPage}
    </div>
  )
};

export default App;
