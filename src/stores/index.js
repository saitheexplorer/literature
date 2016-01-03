import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import literatureApp from 'reducers';

let middleware = [thunk];

// if (ENV !== 'production') middleware = [...middleware, createLogger()];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const Store = createStoreWithMiddleware(literatureApp, window.STATE_FROM_SERVER);

export default Store;

