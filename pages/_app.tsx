import '../styles/globals.css';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { Fragment, useEffect } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyBcFNSnyhRbDFbDI4KDtqPDUfCCOBfTwaQ',
      authDomain: 'zakaz-frontend-guild.firebaseapp.com',
      projectId: 'zakaz-frontend-guild',
      storageBucket: 'zakaz-frontend-guild.appspot.com',
      messagingSenderId: '217750990950',
      appId: '1:217750990950:web:a86cca0bbec9e21051bda7',
    };

    // Initialize Firebase
    initializeApp(firebaseConfig);
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <Component { ...pageProps } />
    </Fragment>
  );
}

export default MyApp;
