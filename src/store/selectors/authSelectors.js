import { createSelector } from 'reselect';

export const selectState = (state) => state.auth;

export const selectToken = createSelector(
  selectState,
  (authState) => authState.token,
);

export const selectUser = createSelector(
  selectState,
  (authState) => authState.user,
);

export const selectBucket = createSelector(
  selectState,
  (authState) => authState.bucket,
);
