import { UserCredential } from "firebase/auth";

export type TLoginWithEmailAndPasswordResult = UserCredential;

export type TAuthContext = {
  isAuthenticate: boolean | null;
  user?: any;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => void;
  loginWithOauthPopup: (provider: string) => Promise<UserCredential>;
};
