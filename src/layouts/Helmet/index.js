import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { useWindowSize } from 'hooks/index';
import { Header, Bucket } from 'components/index';

import styles from './Helmet.scss';

const HelmetLayout = (props) => {
  const { children, title, metaDescription } = props;
  const { isTablet, isMobile } = useWindowSize();

  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
      </Head>
      <Header />
      <div className={`container ${styles.main_container}`}>{children}</div>

      {(isTablet && !isMobile) || (!isTablet && isMobile) ? (
        <div className={styles.budget}>
          <Bucket />
        </div>
      ) : null}
    </>
  );
};

HelmetLayout.defaultProps = {
  title: '',
  metaDescription: '',
};

HelmetLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  metaDescription: PropTypes.string,
};

export default HelmetLayout;
