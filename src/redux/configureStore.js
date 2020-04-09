import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// persisted state saved to redux / persisted state retrieved from redux
import { createPersistoid, persistCombineReducers, REGISTER } from 'redux-persist';

import clientMiddleware from './clientMiddleware';
import rootReducer from './reducer';

// ----------------------------------------------------------------------

function combine(reducers, persistConfig) {
  if (persistConfig) {
    return persistCombineReducers(persistConfig, reducers);
  }
  return combineReducers(reducers);
}

// ----------------------------------------------------------------------

function customLogger({ getState }) {
  return next => action => {
    console.log('>>>>>>>>>>>>>>>>> configureStore > customLogger() > will dispatch', action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log('>>>>>>>>>>>>>>>>> configureStore > customLogger() > state after dispatch', getState());

    return returnValue;
  }
};

// ----------------------------------------------------------------------

function getNoOperationReducers(reducers, array) {
  if (!array) {
    return {};
  }

  // array.reduce( (accumulator, element) => cb, initAccumulator )
  return Object.keys(array).reduce((accu, element) => {
    if (reducers[element]) {
      return accu;
    }

    return {
      ...accu,
      [element]: (state = array[element]) => state
    };
  }, {});
}

// ----------------------------------------------------------------------

export default function configureStore({ data, helpers, persistConfig }) {

  const middleware = [clientMiddleware(helpers)];

  if (__CLIENT__ && __DEVELOPMENT__) {
    middleware.push(customLogger);
  }

  // ----------------------------------------------------------------------

  if (__CLIENT__ && __DEVELOPMENT__) {
    const logger = require('redux-logger').createLogger({
      collapsed: true, 
      colors: {title: () => 'inherit',prevState: () => '#9E9E9E',action: () => '#03A9F4',nextState: () => '#4CAF50',error: () => '#F20404'}
    }); // custom options
    middleware.push(logger);
  }

  const enhancers = [applyMiddleware(...middleware)];

  // ----------------------------------------------------------------------

  const finalEnhancer = compose(...enhancers)(createStore);
  const reducers = rootReducer();
  const noopReducers = getNoOperationReducers(reducers, data);
  const store = finalEnhancer(combine({ ...noopReducers, ...reducers }, persistConfig), data);

  // ----------------------------------------------------------------------

  store.asyncReducers = {};
  // store.inject = _reducers => inject(store, _reducers, persistConfig);

  if (persistConfig) {
    const persistoid = createPersistoid(persistConfig);
    store.subscribe(() => {
      persistoid.update(store.getState());
    });
    store.dispatch({ type: REGISTER });
  }

  // ----------------------------------------------------------------------

  if (__DEVELOPMENT__) {
    console.log('>>>>>>>>>>>>>>>>>>> configureStore() > MODULE ??? __DEVELOPMENT__: ', __DEVELOPMENT__);
  }

  if (__DEVELOPMENT__ && module.hot) {
    console.log('>>>>>>>>>>>>>>>>>>> configureStore() > YES MODULE.HOT <<<<<<<<<<<<<<<<<');
    module.hot.accept('./reducer', () => {
      let reducer = require('./reducer');
      reducer = combine((reducer.__esModule ? reducer.default : reducer)(store.asyncReducers), persistConfig);
      store.replaceReducer(reducer);
    });
  } else {
    console.log('>>>>>>>>>>>>>>>>>>> configureStore() > NO MODULE.HOT <<<<<<<<<<<<<<');
  }

  // ----------------------------------------------------------------------

  return store;
};
