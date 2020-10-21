import { HYDRATE } from 'next-redux-wrapper';

import { createActionName } from 'utils/index';

export const ADD_BUCKET = createActionName('bucket', 'add_bucket');
export const ADD_BUCKET_STARTED = createActionName(
  'bucket',
  'add_bucket_started',
);
export const ADD_BUCKET_ERROR = createActionName('bucket', 'add_bucket_error');

export const REMOVE_BUCKET = createActionName('bucket', 'remove_bucket');
export const REMOVE_BUCKET_STARTED = createActionName(
  'bucket',
  'remove_bucket_started',
);
export const REMOVE_BUCKET_ERROR = createActionName(
  'bucket',
  'remove_bucket_error',
);

export const SET_BUCKET = createActionName('bucket', 'set_bucket');
export const SET_BUCKET_STARTED = createActionName(
  'bucket',
  'set_bucket_started',
);
export const SET_BUCKET_ERROR = createActionName('bucket', 'set_bucket_error');

const initialState = [];

const bucketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HYDRATE:
      return payload.bucket;

    case ADD_BUCKET: {
      return [...state, payload];
    }

    case REMOVE_BUCKET: {
      return state.filter((item) => item.name !== payload);
    }
    case SET_BUCKET: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

export default bucketReducer;
