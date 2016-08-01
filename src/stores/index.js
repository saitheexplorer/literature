import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from 'reducers';

const Store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
  )
);

export default Store;
