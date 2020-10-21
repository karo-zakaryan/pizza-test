import { createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';

import reducers from './reducer';
import createMiddleware from './middleware';

const middleware = createMiddleware(thunkMiddleware);

export const store = createStore(reducers, middleware);

const makeStore = () => store;

const configureStore = createWrapper(makeStore);

export default configureStore;
