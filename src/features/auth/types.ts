import { UserCredential } from 'firebase/auth';

type TLoginWithEmailAndPasswordResult = UserCredential;

export type TAuthContext = {
  // boolean - определенное состояние. null - неизвестное (загрузка)
  isAuthenticated: boolean | null;
  user?: any;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<TLoginWithEmailAndPasswordResult>;
};
