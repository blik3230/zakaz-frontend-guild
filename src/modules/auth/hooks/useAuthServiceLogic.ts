import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../sdk/firebase';
import { UserProfile } from '../auth.types';
import { transformUserToUserProfile } from '../helpers/transformUserToUserProfile';

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
        console.log('user authorized');
        const newUserProfile = transformUserToUserProfile(user);
        setUserProfile(newUserProfile);
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
