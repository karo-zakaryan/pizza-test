import { createActionName } from 'utils/index';

export const SET_DELIVERY = createActionName('delivery', 'set_delivery');
export const SET_DELIVERY_STARTED = createActionName(
  'delivery',
  'set_delivery_started',
);
export const SET_DELIVERY_ERROR = createActionName(
  'delivery',
  'set_delivery_error',
);

const initialState = {};

const deliveryReducer = (state = initialState, { type }) => {
  switch (type) {
    default: {
      return state;
    }
  }
};

export default deliveryReducer;
