import React, { useState } from 'react';
import { Input } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-input-2';

import { validate } from 'utils/index';
import { authActions } from 'store/actions';

import styles from './Registration.scss';
import 'react-phone-input-2/lib/style.css';

const Registration = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      surname: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: (values) => {
      dispatch(authActions.register({ ...values, phone }));
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.errors}>{formik.errors.email}</div>
        ) : null}
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
      <div>
        <label htmlFor="surname">Surename</label>
        <Input
          id="surname"
          name="surname"
          type="text"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.surname}
        />
        {formik.touched.surname && formik.errors.surname ? (
          <div className={styles.errors}>{formik.errors.surname}</div>
        ) : null}
      </div>
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
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.errors}>{formik.errors.password}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="confirmPassword">Password Confirmation</label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className={styles.errors}>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <button type="submit" disabled={!formik.isValid && !phone}>
        Sign Up
      </button>
    </form>
  );
};

export default Registration;
