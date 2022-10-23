import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { logger } from "redux-logger";

import watcherSaga from "./sagas/index";

import App from "./App";

import "./styles.css";
import "antd/dist/antd.css";
import "ant-design-pro/dist/ant-design-pro.css";

const sagaMiddleware = createSagaMiddleware();

const initialStore = {
  currency: "BTC"
};

let store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(watcherSaga);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
