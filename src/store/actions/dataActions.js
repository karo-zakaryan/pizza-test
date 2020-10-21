import { database } from 'libraries/index';

import {
  GET_PIZZAS,
  GET_PIZZAS_STARTED,
  GET_PIZZAS_ERROR,
} from '../reducers/dataReducer';

export const getPizzasStarted = () => ({ type: GET_PIZZAS_STARTED });
export const getPizzasError = (err) => ({
  type: GET_PIZZAS_ERROR,
  payload: err,
});
export const getPizzasFinished = (data) => ({
  type: GET_PIZZAS,
  payload: data,
});

export const getPizzas = () => async (dispatch) => {
  try {
    dispatch(getPizzasStarted());

    await database.ref('pizzas').on('value', (snapshot) => {
      const data = snapshot.val();
      dispatch(getPizzasFinished(data));
    });
  } catch (err) {
    dispatch(getPizzasError(err));
  }
};
