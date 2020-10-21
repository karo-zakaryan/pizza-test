import React from 'react';
import { Input } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { loginValidate } from 'utils/index';
import { authActions } from 'store/actions';

import styles from '../Registration/Registration.scss';

const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: loginValidate,
    onSubmit: (values) => dispatch(authActions.loginWithEmail(values)),
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

      <button type="submit" disabled={!formik.isValid}>
        Sign In
      </button>
    </form>
  );
};

export default Login;
