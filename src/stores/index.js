import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import literatureApp from 'reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);

const Store = createStoreWithMiddleware(literatureApp, window.STATE_FROM_SERVER);

export default Store;

