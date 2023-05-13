import { useContext } from 'react';
import { AuthServiceContext } from '../auth.context';

const useAuthService = () => {
  const authService = useContext(AuthServiceContext);

  if (!authService) {
    throw new Error('AuthServiceContext is used out of context provider');
  }

  return authService;
};

export default useAuthService;
