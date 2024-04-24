import Box from '@mui/material/Box';
import {FC, useState} from 'react';
import useAuthService from '../../hooks/useAuthService';
import LoginForm from '../LoginForm/LoginForm';
import {Paper} from "@mui/material";
import SignUpForm from "../SignUpForm/SignUpForm";

const AuthProtection: FC = (props) => {
  const {loginIsChecked, isLogedIn} = useAuthService();
  const [renderMode, setRenderMode] = useState<'login' | 'sign_up' | 'successful_login'>('login');


  if (!loginIsChecked) {
    return <div>Check authorization</div>;
  }

  if (isLogedIn) {
    return <>{props.children}</>;
  }

  return (
    <Box sx={{display: 'flex', height: '100%'}}>
      <Box sx={{margin: 'auto', width: 480, p: "100px 0 0"}}>
        {renderMode === 'login' && (
          <LoginForm
            onClickToSignUp={() => setRenderMode('sign_up')}
          />
        )}

        {renderMode === 'sign_up' && (
          <SignUpForm
            onClickToLogin={() => setRenderMode('login')}
          />
        )}
      </Box>
    </Box>
  );
};

export default AuthProtection;
