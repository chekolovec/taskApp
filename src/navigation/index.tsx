import * as React from "react";
import { Switch, Route } from "react-router-dom";

import { MainScreen, LoginScreen } from "../screens";

export const Navigation = () => (
  <Switch>
    <Route exact path="/">
      <MainScreen />
    </Route>
    <Route path="/login">
      <LoginScreen />
    </Route>
  </Switch>
);
