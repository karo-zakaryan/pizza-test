import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const FlexLink = ({
  to,
  children,
  disabled,
  queryKey,
  className,
  queryValue,
  anchorProps,
  activeClassName,
  ...linkProps
}) => {
  const { asPath, query } = useRouter();
  const anchorClasses = classNames(className, {
    [activeClassName]: query[queryKey]
      ? query[queryKey] === queryValue
      : asPath === to && activeClassName,
  });

  return (
    <Link href={to} {...linkProps}>
      <a className={anchorClasses} {...anchorProps}>
        {children}
      </a>
    </Link>
  );
};

FlexLink.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.string,
  queryKey: PropTypes.string,
  className: PropTypes.any,
  queryValue: PropTypes.any,
  anchorProps: PropTypes.any,
  activeClassName: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

FlexLink.defaultProps = {
  children: [],
  disabled: undefined,
  queryKey: undefined,
  className: undefined,
  queryValue: undefined,
  anchorProps: {},
  activeClassName: undefined,
};

export default FlexLink;
