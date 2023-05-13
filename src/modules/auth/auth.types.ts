import useAuthServiceLogic from './hooks/useAuthServiceLogic';

export type AuthService = ReturnType<typeof useAuthServiceLogic>;

export interface UserProfile {
  displayName: string;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}
