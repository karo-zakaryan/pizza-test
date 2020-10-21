import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';

import { priceConverter } from 'utils/index';
import { bucketActions } from 'store/actions';
import { bucketSelectors, currencySelectors } from 'store/selectors';

import styles from './CartItem.scss';

import Counter from '../Counter';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const bucket = useSelector(bucketSelectors.selectBucket);
  const currencyList = useSelector(currencySelectors.selectCurrency);
  const currency = useSelector(currencySelectors.selectCurrentCurrency);

  const handleDelete = () => {
    if (bucket.length === 1) {
      dispatch(bucketActions.setBucket([]));
    }
    dispatch(bucketActions.removeFromBucket(item.name));
  };

  const handleChange = (callback) => {
    const changedData = bucket.map((el) => {
      if (el.name === item.name) {
        return { ...el, qty: callback() };
      }
      return el;
    });
    dispatch(bucketActions.setBucket(changedData));
  };

  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_wrapper}>
        <div className={styles.image_wrapper}>
          <img src={item.image} alt={item.name} />
        </div>
        <div>
          <h2>{item.name}</h2>
          <p>{item.ingredients}</p>
          <h3>
            {item.choose.name}
            {priceConverter(currency, item.choose.price, currencyList)}
            {currency} for piece
          </h3>
        </div>
        <Counter value={item.qty} setValue={handleChange} />
      </div>

      <CloseCircleOutlined className={styles.cross} onClick={handleDelete} />
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

CartItem.defaultProps = {
  item: {},
  index: 0,
};

export default CartItem;
