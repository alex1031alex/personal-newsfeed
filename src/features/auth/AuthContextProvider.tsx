import React, { createContext, FC, useContext, useEffect, useState } from "react";
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
  UserCredential,
} from "firebase/auth";
import { TAuthContext } from "./types";
import { FirebaseApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

type TProps = {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
};

export const authContext = createContext<TAuthContext>({
  isAuthenticated: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  logOut: () => void 0,
  loginWithOauthPopup: () => Promise.reject({}),
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

const isUserAdmin = async (firebaseApp: FirebaseApp) => {
  const db = getFirestore(firebaseApp);
  return await getDoc(doc(db, "/internal/auth"));
};

export const AuthContextProvider: FC<TProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<TAuthContext["isAuthenticated"]>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(props.firebaseApp));

  useEffect(() => {
    if (!auth) {
      return;
    }

    auth.setPersistence(browserLocalPersistence);
    auth.languageCode = "en";

    auth.onAuthStateChanged((user) => {
      if (user) {
        //Проверяем, является ли пользователь админом
        //Проверка проводится на доступ к документу auth
        //Если никаких ошибок нет, то пользователь - админ
        isUserAdmin(props.firebaseApp)
          .then(() => {
            setIsAuthenticated(true);
            setUser(user);
          })
          .catch(() => {
            //Пользователь не админ, разлогиним его
            logOut();
            //Сбрасываем аутентификацию
            setIsAuthenticated(false);
            setUser(null);
          });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  }, [auth]);

  const processLogin = (loginPromise: Promise<UserCredential>) => {
    setUser(null);
    setIsAuthenticated(null);

    return loginPromise
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return processLogin(signInWithEmailAndPassword(auth, email, password));
  };

  const loginWithOauthPopup = (providerId: string) => {
    return processLogin(signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[providerId]));
  };

  const logOut = () => signOut(auth);

  return (
    <authContext.Provider value={{ isAuthenticated, user, loginWithEmailAndPassword, logOut, loginWithOauthPopup }}>
      {props.children}
    </authContext.Provider>
  );
};
