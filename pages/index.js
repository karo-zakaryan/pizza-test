import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetLayout } from 'layouts/index';
import { authInitialize } from 'utils/index';
import { HomeContainer } from 'containers/index';
import { bucketSelectors } from 'store/selectors';
import { bucketActions, currencyActions, pizzasActions } from 'store/actions';

const HomePage = (props) => {
  const dispatch = useDispatch();
  const reduxBucket = useSelector(bucketSelectors.selectBucket);

  useEffect(() => {
    const bucket = JSON.parse(localStorage.getItem('bucket')) || [];

    dispatch(bucketActions.setBucket(bucket));
  }, [reduxBucket && reduxBucket.length]);

  return (
    <HelmetLayout
      title="Pizza"
      metaDescription="Pizza list page."
    >
      <HomeContainer {...props} />
    </HelmetLayout>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const { dispatch } = ctx.store;
  await authInitialize(ctx);
  await dispatch(pizzasActions.getPizzas());
  await dispatch(currencyActions.getCurrency());

  return {};
};

export default HomePage;
