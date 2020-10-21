import React from 'react';

import { Login } from 'components/index';

import styles from './LoginContainer.scss';

const LoginContainer = () => (
  <div className={styles.login}>
    <h1>Login</h1>
    <Login />
  </div>
);

export default LoginContainer;
