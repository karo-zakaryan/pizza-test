import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useFormik } from 'formik';
import shortid from 'shortid';
import { Button, Input } from 'antd';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';

import {
  authSelectors,
  bucketSelectors,
  currencySelectors,
} from 'store/selectors';
import { database } from 'libraries/index';
import { bucketActions, deliveryActions } from 'store/actions';
import { priceConverter, userFormValidate } from 'utils/index';

import styles from './Bucket.scss';

import CartItem from '../CartItem';
import FlexModal from '../FlexModal';
import { BucketIcon } from '../../icons';

const Bucket = () => {
  const dispatch = useDispatch();
  const bucket = useSelector(bucketSelectors.selectBucket);
  const currency = useSelector(currencySelectors.selectCurrentCurrency);
  const currencyList = useSelector(currencySelectors.selectCurrency);
  const currentUser = useSelector(authSelectors.selectUser);
  const token = useSelector(authSelectors.selectToken);

  const [length, setLength] = useState(0);
  const [user, setUser] = useState(currentUser);
  const [price, setPrice] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSave = (values) => {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}  ${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;

    if (user.id) {
      database.ref(`users/${user.id}`).set({
        ...user,
        lastPurchases: {
          ...user.lastPurchases,
          [date]: {
            bucket,
            total: priceConverter(currency, price, currencyList),
            currency,
          },
        },
      });
      dispatch(deliveryActions.setDelivery({ ...user, phone, bucket }));
    } else {
      dispatch(deliveryActions.setDelivery({ ...values, phone, bucket }));
    }
    setIsBought(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
    dispatch(bucketActions.setBucket([]));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
    },
    validate: userFormValidate,
    onSubmit: (values) => handleSave({ ...values, phone }),
  });

  useEffect(() => {
    if (!bucket.length) {
      setTimeout(() => setVisible(false), 3000);
    }
    const currents = bucket.reduce(
      (acc, currentValue) => ({
        price: currentValue.qty * currentValue.choose.price,
        length: currentValue.qty + acc.length,
      }),
      { price: 0, length: 0 },
    );

    setLength(currents.length);
    setPrice(currents.price);
  }, [bucket]);

  const resetBucket = () => {
    dispatch(bucketActions.setBucket([]));
    setVisible(false);
  };

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      setUser(currentUser);
      formik.setValues({
        name: currentUser.name,
        address: currentUser.address,
        phone: currentUser.phone,
      });
      setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const ifUserBuy = isBought ? (
    <div className={styles.thanks}>
      <img src="/img/thanks.png" alt="thanks" />
    </div>
  ) : (
    <div className={styles.empty_recycle}>You dont choose anything </div>
  );

  const renderPizzas = () =>
    bucket.map((item) => <CartItem item={item} key={shortid.generate()} />);

  return (
    <div className={styles.bucket}>
      <BucketIcon
        onClick={() => {
          if (bucket.length) {
            setVisible(true);
          }
        }}
      />
      {bucket.length ? (
        <span className={styles.bucket_counter}>{length}</span>
      ) : null}
      <FlexModal visible={visible} setVisible={setVisible}>
        {!bucket.length ? (
          ifUserBuy
        ) : (
          <div className={styles.cart}>
            {renderPizzas()}
            <div className={styles.price}>
              Total Price {priceConverter(currency, price, currencyList)}
              {currency}
            </div>

            <form className={styles.submit_form} onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="address">Address</label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className={styles.errors}>{formik.errors.address}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <PhoneInput country="us" value={phone} onChange={setPhone} />
                {!phone ? <div>{formik.errors.phone}</div> : null}
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className={styles.errors}>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className={styles.btn_wrapper}>
                {token ? (
                  <button
                    type="submit"
                    onClick={handleSave}
                    className={styles.purchase_btn}
                  >
                    Purchase
                  </button>
                ) : null}
                <Button
                  type="primary"
                  className={styles.purchase_btn}
                  onClick={resetBucket}
                >
                  Reset Bucket
                </Button>
              </div>
            </form>
          </div>
        )}
      </FlexModal>
    </div>
  );
};

export default Bucket;
