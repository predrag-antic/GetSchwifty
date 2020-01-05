import React, { Component } from 'react';
import { Route } from 'react-router';
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
import { requestPlaces } from './store/actions/place.actions';
import { requestBands } from './store/actions/band.actions';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

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

    store.dispatch(requestPlaces());
    store.dispatch(requestBands());
    
    return (
      <Provider store={store}>
        <div>
          <NavMenu></NavMenu>
          <Switch>
            {
            this.getRoutes(routes)
            }
          </Switch>
        </div>
      </Provider>
    );
  }
}
