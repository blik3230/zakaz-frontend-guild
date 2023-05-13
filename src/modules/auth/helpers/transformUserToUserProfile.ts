import { User } from 'firebase/auth';
import { UserProfile } from '../auth.types';

export const transformUserToUserProfile = (user: User): UserProfile | null => {
  const {
    uid, providerId,
    phoneNumber,
    displayName,
    photoURL,
    email,
  } = user;

  return {
    displayName: displayName || 'Anonymous',
    uid,
    providerId,
    phoneNumber,
    email,
    photoURL,
  };
};
