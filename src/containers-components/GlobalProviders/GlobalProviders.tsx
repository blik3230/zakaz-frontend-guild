import { ReactNode } from 'react';
import { AuthServiceContext, useAuthServiceLogic } from '../../modules/auth';

interface GlobalProvidersProps {
  children: ReactNode;
}

const GlobalProviders = ({children}: GlobalProvidersProps) => {
  const authService = useAuthServiceLogic();

  return (
    <AuthServiceContext.Provider value={authService}>
      { children }
    </AuthServiceContext.Provider>
  );
};

export default GlobalProviders;
