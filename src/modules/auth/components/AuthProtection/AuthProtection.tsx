import Box from '@mui/material/Box';
import { FC } from 'react';
import useAuthService from '../../hooks/useAuthService';
import LoginForm from '../LoginForm/LoginForm';

const AuthProtection: FC = (props) => {
  const { loginIsChecked, isLogedIn } = useAuthService();

  if (!loginIsChecked) {
    return <div>Check authorization</div>;
  }

  if (isLogedIn) {
    return <>{ props.children }</>;
  }

  return (
    <Box sx={ { display: 'flex', height: '100%' } }>
      <Box sx={ { maxWidth: 460, margin: 'auto' } }>
        <LoginForm/>

        {/*<RegistrationForm/>*/}
      </Box>
    </Box>
  );
};

export default AuthProtection;
