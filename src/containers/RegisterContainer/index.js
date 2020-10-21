import React from 'react';

import { Registration } from 'components/index';

import styles from './RegisterContainer.scss';

const RegisterContainer = () => (
  <div className={styles.register_wrapper}>
    <h1>Registration</h1>
    <Registration />
  </div>
);

export default RegisterContainer;
