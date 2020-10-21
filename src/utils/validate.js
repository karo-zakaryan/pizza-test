const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (!/^[a-zA-Z]+$/i.test(values.name)) {
    errors.name = 'Must be only letters';
  }

  if (!values.surname) {
    errors.surname = 'Required';
  } else if (!/^[a-zA-Z]+$/i.test(values.surname)) {
    errors.surname = 'Must be only letters';
  }

  if (!values.address) {
    errors.address = 'Required';
  } else if (values.address.length > 50) {
    errors.address = 'Must be 50 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password should be more then 6 character';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword.length < 6) {
    errors.confirmPassword = 'Must be 6 characters';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords dont match';
  }

  return errors;
};

export default validate;
