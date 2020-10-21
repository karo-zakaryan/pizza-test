import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { bucketActions } from 'store/actions';
import { bucketSelectors } from 'store/selectors';

import styles from './BucketClick.scss';

import { BucketIcon } from '../../icons';

const BucketClick = ({ item }) => {
  const bucket = useSelector(bucketSelectors.selectBucket);
  const dispatch = useDispatch();

  const openNotification = (placement) => {
    notification.info({
      message: `You have added to bucket ${item.qty}  ${item.name} pizzas`,
      placement,
    });
  };

  const handleAddToBucket = () => {
    const indexOfRepeat = bucket.findIndex((el) => el.name === item.name);

    openNotification('bottomRight');
    if (indexOfRepeat < 0) {
      dispatch(bucketActions.addToBucket(item));
    } else {
      dispatch(
        bucketActions.setBucket(
          bucket.map((el, index) => {
            if (indexOfRepeat === index) {
              return { ...el, qty: el.qty + item.qty };
            }
            return el;
          }),
        ),
      );
    }
  };

  return (
    <div
      role="button"
      onClick={handleAddToBucket}
      className={styles.bucket_click}
    >
      <BucketIcon />
    </div>
  );
};

BucketClick.propTypes = {
  item: PropTypes.object,
};

BucketClick.defaultProps = {
  item: {},
};

export default BucketClick;
