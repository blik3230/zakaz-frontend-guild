import { DataSnapshot } from '@firebase/database';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../../sdk/firebase';
import { UserProfile } from '../auth.types';

// todo: use hooks for firebase authentication and database
// https://firebaseopensource.com/projects/csfrequency/react-firebase-hooks/#why?

const useAuthServiceLogic = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const uid = user.uid;
      const userProfileRef = ref(database, `/users/${ uid }`);

      const handleValueChange = (snapshot: DataSnapshot) => {
        const data = snapshot.val();

        setUserProfile(data);
      };

      const unsubscribable = onValue(userProfileRef, handleValueChange);

      return () => {
        // Отписка от слушателя onValue при размонтировании компонента
        unsubscribable();
      };
    } else {
      setUserProfile(null);
    }
  }, [user]);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        await signInWithEmailAndPassword(
          auth, email, password);
        return true;
      } catch (err) {
        return false;
      }
    }, []);

  const logout = useCallback(() => {
    signOut(auth).then();
  }, []);

  return {
    loginIsChecked: user || !loading,
    isLogedIn: !!userProfile,
    userProfile: userProfile,
    login,
    logout,
    error,
  };
};

export default useAuthServiceLogic;
