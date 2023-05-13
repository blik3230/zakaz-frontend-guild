import { createContext } from 'react';
import { AuthService } from './auth.types';

export const AuthServiceContext = createContext<AuthService|null>(null);
