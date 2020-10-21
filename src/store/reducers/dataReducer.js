import { HYDRATE } from 'next-redux-wrapper';

import { createActionName } from 'utils/index';

export const GET_PIZZAS = createActionName('pizza', 'get_pizzas');
export const GET_PIZZAS_STARTED = createActionName(
  'pizza',
  'get_pizzas_started',
);
export const GET_PIZZAS_ERROR = createActionName('pizza', 'get_pizzas_error');

const initialState = {
  pizzas: [],
};

const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HYDRATE:
      return payload.pizzas;

    case GET_PIZZAS: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

export default dataReducer;
