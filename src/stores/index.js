import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers';

const Store = createStore(reducer, applyMiddleware(thunk));

export default Store;
