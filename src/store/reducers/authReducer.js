import { HYDRATE } from 'next-redux-wrapper';

import { createActionName } from 'utils/index';

export const SET_TOKEN = createActionName('auth', 'set_token');
export const SET_TOKEN_STARTED = createActionName('auth', 'set_token_started');
export const SET_TOKEN_ERROR = createActionName('auth', 'set_token_error');

export const SET_USER = createActionName('auth', 'set_user');
export const SET_USER_STARTED = createActionName('auth', 'set_user_started');
export const SET_USER_ERROR = createActionName('auth', 'set_user_error');

export const LOGIN = createActionName('auth', 'login');
export const LOGIN_STARTED = createActionName('auth', 'login_started');
export const LOGIN_ERROR = createActionName('auth', 'login_error');

export const REGISTER = createActionName('auth', 'register');
export const REGISTER_STARTED = createActionName('auth', 'register_started');
export const REGISTER_ERROR = createActionName('auth', 'register_error');

export const LOGOUT = createActionName('auth', 'logout');
export const LOGOUT_STARTED = createActionName('auth', 'logout_started');
export const LOGOUT_ERROR = createActionName('auth', 'logout_error');

const initialState = {
  user: {},
  token: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HYDRATE:
      return { ...state, ...payload.auth };

    case LOGOUT: {
      return {
        ...state,
        token: null,
      };
    }

    case SET_TOKEN: {
      return { ...state, token: payload };
    }

    case SET_USER:
    case LOGIN:
    case REGISTER: {
      return { ...state, user: payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default authReducer;
