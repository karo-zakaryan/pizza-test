import { combineReducers } from 'redux';

import { auth, pizzas, bucket, currency, delivery } from '../../store/reducers';

const rootReducer = combineReducers({
  auth,
  pizzas,
  bucket,
  currency,
  delivery,
});

export default rootReducer;
