import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Pizza.scss';

import Counter from '../Counter';
import Dropdown from '../Dropdown';
import FlexModal from '../FlexModal';
import BucketClick from '../BucketClick';

const Pizza = ({ item }) => {
  const { image, name, ingredients, drop } = item;
  const ref = useRef(null);

  const [value, setValue] = useState(1);
  const [dropValue, setDropValue] = useState(drop[0]);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setTimeout(() => setActive(false), 5000);
  }, []);

  return (
    <div className={styles.simple_pizza}>
      <div
        role="button"
        className={classNames(styles.image, {
          [styles.skeleton]: active,
          [styles.without_skeleton]: !active,
        })}
        onClick={() => setVisible(true)}
      >
        <Skeleton.Input
          style={{
            width: ref && ref.current && ref.current.width,
            height: 200,
            zIndex: 500000,
            position: 'absolute',
          }}
          active={active}
        />
        <img src={image} alt="pizza" ref={ref} />
      </div>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.ingredients}>{ingredients}</p>
      <div className={styles.divider} />
      <div className={styles.bottom_bar}>
        <Dropdown list={drop} value={dropValue} change={setDropValue} />
        <Counter value={value} setValue={setValue} />
        <BucketClick
          item={{
            ...item,
            qty: value,
            choose: dropValue,
          }}
        />
      </div>
      <FlexModal visible={visible} setVisible={setVisible}>
        <img src={image} alt="modal" />
        <h1 className={styles.pre_wrap}>{name}</h1>
      </FlexModal>
    </div>
  );
};

Pizza.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

Pizza.defaultProps = {
  item: {},
  index: 0,
};

export default Pizza;
