import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter as Router } from "react-router-dom";
import logger from "redux-logger";

import reducer from "./redux/reducers";
import mainSaga from "./redux/sagas";
import { Navigation } from "./navigation";

const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(mainSaga);

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </Router>
  );
};

export default App;
