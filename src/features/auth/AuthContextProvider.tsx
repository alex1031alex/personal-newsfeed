import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { firebaseApp } from '../firebase/init';
import { getAuth, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import { TAuthContext } from './types';
type TProps = {
  children: React.ReactNode;
};

// TODO Дима должен это заинитеть где-то на уровне админки
const auth = getAuth(firebaseApp);
auth.languageCode = 'ru';

auth.setPersistence(browserSessionPersistence);

export const authContext = createContext<TAuthContext>({
  isAuthenticated: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

export const AuthContextProvider: FC<TProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<TAuthContext['isAuthenticated']>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log('auth changed', user);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        loginWithEmailAndPassword,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
