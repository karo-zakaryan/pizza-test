import React from 'react';

import { HelmetLayout } from 'layouts/index';
import { authInitialize } from 'utils/index';
import { LoginContainer } from 'containers/index';

const LoginPage = () => (
  <HelmetLayout title="Login" metaDescription="Login Page">
    <LoginContainer />
  </HelmetLayout>
);

LoginPage.getInitialProps = async (ctx) => {
  await authInitialize(ctx);

  return {};
};

export default LoginPage;
