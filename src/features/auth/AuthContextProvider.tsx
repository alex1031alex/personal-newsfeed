import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  User,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { TAuthContext } from './types';
import { FirebaseApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

type TProps = {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
};

export const authContext = createContext<TAuthContext>({
  isAuthenticate: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  logOut: () => void 0,
  loginWithOauthPopup: () => Promise.reject({}),
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

const isUserAdmin = async (firebaseApp: FirebaseApp) => {
  const db = getFirestore(firebaseApp);
  return await getDoc(doc(db, '/internal/auth'));
};

export const AuthContextProvider: FC<TProps> = ({ firebaseApp, children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<TAuthContext['isAuthenticate']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(firebaseApp));

  useEffect(() => {
    if (!auth) {
      return;
    }

    auth.setPersistence(browserLocalPersistence);
    auth.languageCode = 'en';

    auth.onAuthStateChanged((user) => {
      if (user) {
        //Проверяем, является ли пользователь админом
        //Проверка проводится на доступ к документу auth
        //Если никаких ошибок нет, то пользователь - админ
        isUserAdmin(firebaseApp)
          .then(() => {
            setIsAuthenticate(true);
            setUser(user);
          })
          .catch(() => {
            //Пользователь не админ, разлогиним его
            logOut();
            //Сбрасываем аутентификацию
            setIsAuthenticate(false);
            setUser(null);
          });
      } else {
        setIsAuthenticate(false);
        setUser(null);
      }
    });
  }, [auth]);

  const loginWithEmailAndPassword = (email: string, password: string) => {
    //Сбрасываем аутентификацию
    setIsAuthenticate(null);
    setUser(null);

    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        //  todo log data
        return result;
      })
      .catch((error) => {
        //  handle error
        throw error;
      });
  };

  const loginWithPopup = (provider: string) => {
    //Сбрасываем аутентификацию
    setIsAuthenticate(null);
    setUser(null);

    return signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[provider])
      .then((result) => {
        //  todo log data
        return result;
      })
      .catch((error) => {
        //  handle error
        throw error;
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  return (
    <authContext.Provider
      value={{ isAuthenticate, user, loginWithEmailAndPassword, logOut, loginWithOauthPopup: loginWithPopup }}
    >
      {children}
    </authContext.Provider>
  );
};
