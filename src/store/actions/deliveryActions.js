import { database } from 'libraries/index';

import {
  SET_DELIVERY,
  SET_DELIVERY_STARTED,
  SET_DELIVERY_ERROR,
} from '../reducers/deliveryReducer';

export const setDeliveryStarted = () => ({ type: SET_DELIVERY_STARTED });

export const setDeliveryError = (err) => ({
  type: SET_DELIVERY_ERROR,
  payload: err,
});

export const setDeliveryFinished = (data) => ({
  type: SET_DELIVERY,
  payload: data,
});

export const setDelivery = (delivery) => async (dispatch) => {
  try {
    dispatch(setDeliveryStarted());
    database.ref('deliveries').on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        database.ref('deliveries').set([...data, delivery]);
      } else {
        database.ref('deliveries').set([delivery]);
      }
    });
  } catch (err) {
    dispatch(setDeliveryError(err));
  }
};
