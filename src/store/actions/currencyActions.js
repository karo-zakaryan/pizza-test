import axios from 'axios';

import {
  GET_CURRENCY,
  GET_CURRENCY_STARTED,
  GET_CURRENCY_ERROR,
  SET_CURRENT_CURRENCY,
  SET_CURRENT_CURRENCY_ERROR,
  SET_CURRENT_CURRENCY_STARTED,
} from '../reducers/currencyReducer';

import { setCookie } from '~/src/libraries';

export const getCurrencyStarted = () => ({ type: GET_CURRENCY_STARTED });
export const getCurrencyError = (err) => ({
  type: GET_CURRENCY_ERROR,
  payload: err,
});
export const getCurrencyFinished = (data) => ({
  type: GET_CURRENCY,
  payload: data,
});

export const setCurrentCurrencyStarted = () => ({
  type: SET_CURRENT_CURRENCY_STARTED,
});
export const setCurrentCurrencyError = (err) => ({
  type: SET_CURRENT_CURRENCY_ERROR,
  payload: err,
});
export const setCurrentCurrencyFinished = (data) => ({
  type: SET_CURRENT_CURRENCY,
  payload: data,
});

export const getCurrency = () => async (dispatch) => {
  try {
    dispatch(getCurrencyStarted());

    const { data } = await axios.get(
      'https://api.exchangeratesapi.io/latest?base=USD',
    );

    dispatch(getCurrencyFinished(data.rates));
  } catch (err) {
    dispatch(getCurrencyError(err));
  }
};

export const setCurrentCurrency = (current) => async (dispatch) => {
  try {
    dispatch(setCurrentCurrencyStarted());
    setCookie('currency', current);
    dispatch(setCurrentCurrencyFinished(current));
  } catch (err) {
    dispatch(setCurrentCurrencyError(err));
  }
};
