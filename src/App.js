import React from "react";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import createSagaMiddleware from "redux-saga";
// import { middleware as thunkMiddleware } from 'redux-saga-thunk'
// import createLogger from 'redux-logger';
import allReducers from "./reducers";
import "./App.css";
import Routes from "./components/routes/Routes";

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};
const sagaMiddleware = createSagaMiddleware();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware, promise, logger))
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Routes></Routes>
        </div>
      </Provider>
    );
  }
}

export default App;
