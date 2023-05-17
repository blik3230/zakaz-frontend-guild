import { DataSnapshot } from '@firebase/database';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { auth, database } from '../../../sdk/firebase';
import { UserProfile } from '../auth.types';

// todo: use hooks for firebase authentication and database
// https://firebaseopensource.com/projects/csfrequency/react-firebase-hooks/#why?

const useAuthServiceLogic = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loginIsChecked, setLoginIsChecked] = useState(false);

  // check login;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('current user', auth.currentUser);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const starCountRef = ref(database, `/users/${ uid }`);
        const handleValueChange = (snapshot: DataSnapshot) => {
          const data = snapshot.val();

          setUserProfile(data);
        };
        const unsubscribable = onValue(starCountRef, handleValueChange);
        setLoginIsChecked(true);

        return () => {
          // Отписка от слушателя onValue при размонтировании компонента
          unsubscribable();
        };
      } else {
        console.log('user is signed out');
        setUserProfile(null);
      }
      setLoginIsChecked(true);
    });
  }, []);

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

  const logout = useCallback(async () => {
    console.log('logout');
    const result = await signOut(auth);
    console.log(result);
  }, []);

  return {
    loginIsChecked,
    isLogedIn: !!userProfile,
    userProfile: userProfile,
    login,
    logout,
  };
};

export default useAuthServiceLogic;
