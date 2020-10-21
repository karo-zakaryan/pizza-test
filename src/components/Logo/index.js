import React from 'react';

import { paths } from 'constants/index';

import styles from './Logo.scss';

import FlexLink from '../FlexLink';

const Logo = () => (
  <FlexLink className={styles.logo} to={paths.home}>
    <img src="/img/logo.jpg" alt="logo" />
  </FlexLink>
);

export default Logo;
