import Router from 'next/router';
import { message } from 'antd';

import { removeCookie, setCookie, auth, database } from 'libraries/index';

import {
  LOGIN,
  LOGIN_STARTED,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_STARTED,
  LOGOUT_ERROR,
  REGISTER,
  REGISTER_ERROR,
  REGISTER_STARTED,
  SET_TOKEN,
  SET_TOKEN_ERROR,
  SET_TOKEN_STARTED,
  SET_USER,
  SET_USER_ERROR,
  SET_USER_STARTED,
} from '../reducers/authReducer';

export const loginStarted = () => ({ type: LOGIN_STARTED });
export const loginError = (err) => ({ type: LOGIN_ERROR, payload: err });
export const loginFinished = (data) => ({ type: LOGIN, payload: data });

export const registerStarted = () => ({ type: REGISTER_STARTED });
export const registerError = (err) => ({ type: REGISTER_ERROR, payload: err });
export const registerFinished = (data) => ({ type: REGISTER, payload: data });

export const logoutStarted = () => ({ type: LOGOUT_STARTED });
export const logoutError = (err) => ({ type: LOGOUT_ERROR, payload: err });
export const logoutFinished = () => ({ type: LOGOUT });

export const setTokenStarted = () => ({ type: SET_TOKEN_STARTED });
export const setTokenError = (err) => ({ type: SET_TOKEN_ERROR, payload: err });
export const setTokenFinished = (data) => ({ type: SET_TOKEN, payload: data });

export const setUserStarted = () => ({ type: SET_USER_STARTED });
export const setUserError = (err) => ({ type: SET_USER_ERROR, payload: err });
export const setUserFinished = (data) => ({ type: SET_USER, payload: data });

export const setToken = (token) => async (dispatch) => {
  try {
    dispatch(setTokenStarted());

    dispatch(setTokenFinished(token));
  } catch (err) {
    dispatch(setTokenError(err));
  }
};

export const setUser = (user) => async (dispatch) => {
  try {
    dispatch(setUserStarted());

    dispatch(setUserFinished(user));
  } catch (err) {
    dispatch(setUserError(err));
  }
};

export const loginWithEmail = (values) => async (dispatch) => {
  try {
    dispatch(loginStarted());

    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken().then((idToken) => {
              setCookie('token', idToken);
              dispatch(setToken(idToken));

              database.ref('users').on('value', (snapshot) => {
                const data = snapshot.val();

                dispatch(loginFinished(data[user.uid]));
                localStorage.setItem('user', JSON.stringify(data[user.uid]));
              });
              setTimeout(() => {
                Router.push('/');
              }, 500);
            });
          }
        });
      })
      .catch((err) => {
        message.error(err.message);
      });
  } catch (err) {
    dispatch(loginError(err));
    message.error(err.message);
  }
};

export const register = (values) => async (dispatch) => {
  try {
    dispatch(registerStarted());
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken().then((idToken) => {
              setCookie('token', idToken);
              dispatch(setToken(idToken));

              localStorage.setItem('user', JSON.stringify(values));
              dispatch(
                registerFinished({
                  ...values,
                  id: user.uid,
                  token: idToken,
                  bucket: [],
                }),
              );
              database
                .ref(`users/${user.uid}`)
                .set({ ...values, bucket: [], id: user.uid });

              setTimeout(() => {
                Router.push('/');
              }, 500);
            });
          }
        });
      })
      .catch((err) => message.error(err.message));
  } catch (err) {
    message.error(err.message);
    dispatch(registerError(err));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutStarted());
    auth.signOut().then(() => {
      removeCookie('token');
      localStorage.removeItem('user');
      dispatch(logoutFinished());
      dispatch(loginFinished(null));

      Router.push('/');
    });
  } catch (err) {
    dispatch(logoutError(err));
  }
};
