import { HYDRATE } from 'next-redux-wrapper';

import { createActionName } from 'utils/index';

export const GET_CURRENCY = createActionName('currency', 'get_currency');
export const GET_CURRENCY_STARTED = createActionName(
  'currency',
  'get_currency_started',
);
export const GET_CURRENCY_ERROR = createActionName(
  'currency',
  'get_currency_error',
);

export const SET_CURRENT_CURRENCY = createActionName(
  'currency',
  'set_current_currency',
);
export const SET_CURRENT_CURRENCY_STARTED = createActionName(
  'currency',
  'set_current_currency_started',
);
export const SET_CURRENT_CURRENCY_ERROR = createActionName(
  'currency',
  'set_current_currency_error',
);

const initialState = {
  currency: [],
  currentCurrency: 'USD',
};

const currencyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HYDRATE:
      return { ...state, ...payload.currency };

    case GET_CURRENCY: {
      return { ...state, currency: payload };
    }

    case SET_CURRENT_CURRENCY: {
      return { ...state, currentCurrency: payload };
    }

    default: {
      return state;
    }
  }
};

export default currencyReducer;
