import { FC, ReactChildren, ReactNode } from 'react';
import useAuthService from '../../hooks/useAuthService';
import AuthForm from '../AuthForm';

const AuthProtection: FC = (props) => {
  const { loginIsChecked, isLogedIn } = useAuthService();

  if (!loginIsChecked) {
    return <div>Check authorization</div>;
  }

  if (isLogedIn) {
    return <>{ props.children }</>;
  }

  return <AuthForm/>;
};

export default AuthProtection;
