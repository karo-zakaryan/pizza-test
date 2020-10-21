import React, { useEffect } from 'react';
import App from 'next/app';
import Router from 'next/router';
import PropTypes from 'prop-types';
import withError from 'next-with-error';
import { useDispatch, useSelector } from 'react-redux';
import NextNprogress from 'nextjs-progressbar';

import 'antd/dist/antd.css';
import 'styles/index.global.scss';

import { authActions } from 'store/actions';
import { configureStore } from 'libraries/index';
import { authSelectors } from 'store/selectors';

import ErrorPage from './404';

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const token = useSelector(authSelectors.selectToken);

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(authActions.setUser(JSON.parse(user)));
    }
  }, [token]);

  return (
    <>
      <NextNprogress
        height="4"
        color="#936f2d"
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

MyApp.propTypes = {
  pageProps: PropTypes.object.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default configureStore.withRedux(withError(ErrorPage)(MyApp));
