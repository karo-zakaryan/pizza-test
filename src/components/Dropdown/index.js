import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { useSelector } from 'react-redux';

import { priceConverter, noop } from 'utils/index';
import { currencySelectors } from 'store/selectors';

import styles from './Dropdown.scss';

const { Option } = Select;

const Dropdown = ({ list, value, change }) => {
  const currentCurrency = useSelector(currencySelectors.selectCurrentCurrency);
  const currency = useSelector(currencySelectors.selectCurrency);
  const defaultVal = `${value.name} ${value.price}`;

  const renderOptions = () =>
    list.map((item) => (
      <Option key={shortid.generate()} value={`${item.name} ${item.price}`}>
        {item.name}&nbsp;{priceConverter(currentCurrency, item.price, currency)}
        {currentCurrency}
      </Option>
    ));

  return (
    <Select
      defaultValue={defaultVal}
      style={{ width: 120 }}
      onChange={change}
      className={styles.selected}
    >
      {renderOptions()}
    </Select>
  );
};

Dropdown.propTypes = {
  list: PropTypes.array,
  value: PropTypes.string,
  change: PropTypes.func,
};

Dropdown.defaultProps = {
  list: [],
  value: '',
  change: noop(),
};

export default Dropdown;
