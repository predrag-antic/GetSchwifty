import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import routes from './routes'
import './custom.css'
import { NavMenu } from './components/navbar/NavMenu';
import rootReducer from './store/reducers/root.reducer';
import { rootSaga } from './store/sagas/root.saga';
import thunkMiddleware from 'redux-thunk'
import { Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import browserHistory from './history'
import { thunk_action_getUserByIdAuth } from './store/actions/auth-actions';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware, thunkMiddleware]

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

const history = syncHistoryWithStore(browserHistory, store)

sagaMiddleware.run(rootSaga);

export default class App extends Component {
  static displayName = App.name;

  getRoutes = (routes) =>{
    return routes.map((prop, key) => {
        return (
          <Route path={prop.path}
            component={prop.component}
            key={key}
          />
        );
    });
  }

  render () {
    if(localStorage.getItem("id")){
      store.dispatch(thunk_action_getUserByIdAuth(localStorage.getItem("id")))
    }
    return (
      <Provider store={store}>
        <Router history={history}>
        <div>
          <NavMenu></NavMenu>
          <Switch>
            {
            this.getRoutes(routes)
            }
          </Switch>
        </div>
        </Router>
      </Provider>
    );
  }
}
