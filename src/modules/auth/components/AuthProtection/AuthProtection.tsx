import Box from '@mui/material/Box';
import {FC, useState} from 'react';
import useAuthService from '../../hooks/useAuthService';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from "../SignUpForm/SignUpForm";
import {Typography} from "@mui/material";
import * as React from "react";

const AuthProtection: FC = (props) => {
  const {loginIsChecked, isLogedIn} = useAuthService();
  const [renderMode, setRenderMode] = useState<'login' | 'sign_up'>('login');

  if (!loginIsChecked) {
    return <div>Check authorization</div>;
  }

  if (isLogedIn) {
    return <>{props.children}</>;
  }

  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
      <Box sx={{margin: 'auto', maxWidth: 600}}>
        <Typography variant={'h3'}>Welcome to</Typography>
        <Typography variant={'h3'} mb={2}>Zakaz Frontend Guild 👋🏻</Typography>
      </Box>
      <Box sx={{margin: 'auto', width: 480}}>
        {renderMode === 'login' && (
          <LoginForm
            onClickToSignUp={() => setRenderMode('sign_up')}
          />
        )}

        {renderMode === 'sign_up' && (
          <SignUpForm
            // todo: remove this props
            onSuccessFirstStep={() => setRenderMode('sign_up')}
            onClickToLogin={() => setRenderMode('login')}
          />
        )}
      </Box>
    </Box>
  );
};

export default AuthProtection;
