import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';

import GlobalProviders from '../src/containers-components/GlobalProviders/GlobalProviders';
import { GeneralLayout } from '../src/layout-components/GeneralLayout/GeneralLayout';
import { AuthProtection } from '../src/modules/auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Fragment>
      <CssBaseline/>
      <GlobalProviders>
        <GeneralLayout>
          <AuthProtection>
            <Component { ...pageProps } />
          </AuthProtection>
        </GeneralLayout>
      </GlobalProviders>
    </Fragment>
  );
}

export default MyApp;
