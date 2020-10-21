import React from 'react';

import { HelmetLayout } from 'layouts/index';
import { authInitialize } from 'utils/index';
import { RegisterContainer } from 'containers/index';

const RegisterPage = () => (
  <HelmetLayout title="Registration" metaDescription="Registration Page">
    <RegisterContainer />
  </HelmetLayout>
);

RegisterPage.getInitialProps = async (ctx) => {
  await authInitialize(ctx);

  return {};
};

export default RegisterPage;
