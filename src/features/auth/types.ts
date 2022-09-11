import { UserCredential } from "firebase/auth";

export type TLoginWithEmailAndPasswordResult = UserCredential;

export type TAuthContext = {
  isAuthenticated: boolean | null;
  user?: any;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  loginWithOauthPopup: (provider: string) => Promise<UserCredential>;
  logOut: () => void;
};
