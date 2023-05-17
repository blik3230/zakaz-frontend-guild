import useAuthServiceLogic from './hooks/useAuthServiceLogic';

export type AuthService = ReturnType<typeof useAuthServiceLogic>;

export type UserRole = 'admin' | 'developer';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string | null;
  uid: string;
  role: UserRole;
}
