import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux';

import { Pizza } from 'components/index';
import { database } from 'libraries/index';
import { bucketActions, pizzasActions } from 'store/actions';
import { bucketSelectors, pizzasSelectors } from 'store/selectors';

import styles from './HomeContainer.scss';

const HomeContainer = () => {
  const dispatch = useDispatch();
  const bucket = useSelector(bucketSelectors.selectBucket);
  const reduxPizzas = useSelector(pizzasSelectors.selectState);
  const [pizzas, setPizzas] = useState(reduxPizzas);

  useEffect(() => {
    database.ref('pizzas').on('value', (snapshot) => {
      const data = snapshot.val();
      setPizzas(data);
      dispatch(pizzasActions.getPizzasFinished(data));
    });
  }, []);

  useEffect(() => {
    if (reduxPizzas.length) {
      setPizzas(reduxPizzas);
    }
  }, [reduxPizzas.length]);

  useEffect(() => {
    if (bucket.length) {
      dispatch(bucketActions.setBucket(bucket));
    }
  }, [bucket.length]);

  const renderItems = () =>
    pizzas.length &&
    pizzas.map((item) => <Pizza key={shortid.generate()} item={item} />);

  return <div className={styles.pizzas_list}>{renderItems()}</div>;
};

HomeContainer.propTypes = {
  pizzas: PropTypes.array,
};

HomeContainer.defaultProps = {
  pizzas: [],
};

export default HomeContainer;
