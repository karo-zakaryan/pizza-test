import { createSelector } from 'reselect';

export const selectState = (state) => state.bucket;

export const selectBucket = createSelector(
  selectState,
  (authState) => authState,
);
