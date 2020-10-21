const userFormValidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (!/^[a-zA-Z]+$/i.test(values.name)) {
    errors.name = 'Must be only letters';
  }

  if (!values.address) {
    errors.address = 'Required';
  } else if (values.address.length > 50) {
    errors.address = 'Must be 50 characters or less';
  }

  return errors;
};

export default userFormValidate;
