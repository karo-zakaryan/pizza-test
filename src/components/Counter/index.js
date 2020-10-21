import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'utils/index';

import styles from './Counter.scss';

const Counter = ({ value, setValue, className }) => {
  const handleDecrement = () => {
    if (value > 1) {
      setValue(() => value - 1);
    }
  };

  const handleIncrement = () => {
    setValue(() => value + 1);
  };

  const handleChange = (e) => {
    const inputValue = Number(e.target.value);
    if (!inputValue || inputValue <= 1) {
      setValue(1);
    } else {
      setValue(inputValue);
    }
  };

  return (
    <div className={`${className} ${styles.counter}`}>
      <div role="button" onClick={handleDecrement}>
        -
      </div>
      <input onChange={handleChange} type="number" value={value} />
      <div role="button" onClick={handleIncrement}>
        +
      </div>
    </div>
  );
};

Counter.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
  className: PropTypes.string,
};

Counter.defaultProps = {
  value: 1,
  setValue: noop(),
  className: '',
};

export default Counter;
