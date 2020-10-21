import Router from 'next/router';

import { paths } from 'constants/index';
import { getCookie } from 'libraries/index';
import { authActions, currencyActions } from 'store/actions';

import ctxRedirect from './ctxRedirect';

const authInitialize = (ctx, isAuthRequired) =>
  new Promise(async (resolve) => {
    const isServer = typeof window === 'undefined';

    const cookieToken = getCookie('token', ctx.req);
    const cookieCurrency = getCookie('currency', ctx.req);

    if (cookieCurrency) {
      ctx.store.dispatch(
        currencyActions.setCurrentCurrencyFinished(cookieCurrency),
      );
    }

    if (cookieToken) {
      ctx.store.dispatch(authActions.setToken(cookieToken));
    }

    const { token } = ctx.store.getState().auth;

    if (isServer) {
      if (ctx.req.headers.cookie) {
        if (isAuthRequired && !token) {
          ctxRedirect(ctx, paths.login);
        }
        if (
          token &&
          (ctx.pathname === paths.login || ctx.pathname === paths.register)
        ) {
          ctxRedirect(ctx, paths.home);
        }
      } else if (isAuthRequired) {
        ctxRedirect(ctx, paths.login);
      }
      resolve();
    } else {
      if (isAuthRequired && !token) {
        await Router.push(paths.login);
      }

      if (
        token &&
        (ctx.pathname === paths.login || ctx.pathname === paths.register)
      ) {
        await Router.push(paths.home);
      }
      resolve();
    }
  });

export default authInitialize;
