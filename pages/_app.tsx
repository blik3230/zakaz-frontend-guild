import '../styles/globals.css';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';

import GlobalProviders from '../src/containers-components/GlobalProviders/GlobalProviders';
import { AuthProtection } from '../src/modules/auth';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Fragment>
      <CssBaseline />
      <GlobalProviders>
        <AuthProtection>
          <Component { ...pageProps } />
        </AuthProtection>
      </GlobalProviders>
    </Fragment>
  );
}

export default MyApp;
