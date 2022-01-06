import React from "react";
import { Sanctum, AxiosInstance } from "react-sanctum";
import { LoginButton } from "./components";

const sanctumConfig = {
  apiUrl: "http://api.thelabyrinth.world",
  csrfCookieRoute: "sanctum/csrf-cookie",
  signInRoute: "api/auth/login",
  signOutRoute: "api/logout",
  userObjectRoute: "api/user",
  axiosInstance: AxiosInstance,
};

const App = () => (
  <div className="my-application">
    <Sanctum config={sanctumConfig} checkOnInit={false}>
      <h1>registration</h1>
      <LoginButton/>
    </Sanctum>
  </div>
);

export default App