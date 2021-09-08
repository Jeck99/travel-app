import React from 'react';
import store from "./redux/store";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentProfile, logoutProfile } from "./redux/actions/authActions";

import {
  Register,
  Login,
  PrivateRoute,
  Home,
  NotFound,
  HeaderComponent
} from "./components";

const initLogin = () => {
    if (localStorage.jwtToken) {
      const token = localStorage.getItem("jwtToken");
      setAuthToken(token);
      const decoded = jwt_decode(token);
      store.dispatch(setCurrentProfile(decoded));
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutProfile());
        window.location.href = "./";
      }
    }
  }
  
  initLogin()
export default function AppRouter() {
    return (
        <Router>
            <HeaderComponent />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/home" component={Home} />
                <Route component={localStorage.jwtToken ? Home : NotFound}/>
            </Switch>
        </Router>
    )
}
