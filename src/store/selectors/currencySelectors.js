import { createSelector } from 'reselect';

export const selectState = (state) => state.currency;

export const selectCurrency = createSelector(
  selectState,
  (currencyState) => currencyState.currency,
);

export const selectCurrentCurrency = createSelector(
  selectState,
  (currencyState) => currencyState.currentCurrency,
);
