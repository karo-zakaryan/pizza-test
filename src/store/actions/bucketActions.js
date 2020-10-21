import {
  ADD_BUCKET,
  ADD_BUCKET_ERROR,
  ADD_BUCKET_STARTED,
  REMOVE_BUCKET,
  REMOVE_BUCKET_ERROR,
  REMOVE_BUCKET_STARTED,
  SET_BUCKET,
  SET_BUCKET_ERROR,
  SET_BUCKET_STARTED,
} from '../reducers/bucketReducer';

export const addBucketStarted = () => ({ type: ADD_BUCKET_STARTED });
export const addBucketError = (err) => ({
  type: ADD_BUCKET_ERROR,
  payload: err,
});
export const addBucketFinished = (data) => ({
  type: ADD_BUCKET,
  payload: data,
});

export const removeBucketStarted = () => ({ type: REMOVE_BUCKET_STARTED });
export const removeBucketError = (err) => ({
  type: REMOVE_BUCKET_ERROR,
  payload: err,
});
export const removeBucketFinished = (data) => ({
  type: REMOVE_BUCKET,
  payload: data,
});

export const setBucketStarted = () => ({ type: SET_BUCKET_STARTED });
export const setBucketError = (err) => ({
  type: SET_BUCKET_ERROR,
  payload: err,
});
export const setBucketFinished = (data) => ({
  type: SET_BUCKET,
  payload: data,
});

export const addToBucket = (item) => async (dispatch) => {
  const bucket = localStorage.getItem('bucket');
  try {
    dispatch(addBucketStarted());

    const data = bucket ? [...JSON.parse(bucket), item] : [{ ...item }];
    localStorage.setItem('bucket', JSON.stringify(data));
    dispatch(addBucketFinished(item));
  } catch (err) {
    dispatch(addBucketError(err));
  }
};

export const removeFromBucket = (name) => async (dispatch) => {
  try {
    dispatch(removeBucketStarted());

    dispatch(removeBucketFinished(name));
  } catch (err) {
    dispatch(removeBucketError(err));
  }
};

export const setBucket = (list) => async (dispatch) => {
  try {
    dispatch(setBucketStarted());
    localStorage.setItem('bucket', JSON.stringify(list));
    dispatch(setBucketFinished(list));
  } catch (err) {
    dispatch(setBucketError(err));
  }
};
