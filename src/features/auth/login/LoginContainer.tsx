import React, { FC, Reducer, useReducer, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./LoginContainer.css";

import { LoginForm, TLoginField } from "../../../components/LoginForm/LoginForm";
import { ALLOWED_OAUTH_PROVIDERS, useAuthContext } from "../AuthContextProvider";
import { validateEmail } from "./utils";
import { TLoginWithEmailAndPasswordResult } from "../types";

import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/Github";
import LoginIcon from "@mui/icons-material/Login";
import { ProviderId } from "firebase/auth";

type TLoginFieldState = Omit<TLoginField, "onChange">;

type TAction = {
  type: "change" | "error";
  value: string;
};

const getOAuthProviderIcon = (provider: string) => {
  switch (provider) {
    case ProviderId.GOOGLE:
      return <GoogleIcon fontSize="inherit" />;
    case ProviderId.GITHUB:
      return <GitHubIcon fontSize="inherit" />;
    default:
      return <LoginIcon fontSize="inherit" />;
  }
};

const reducer = (state: TLoginFieldState, action: TAction): TLoginFieldState => {
  switch (action.type) {
    case "change": {
      return {
        ...state,
        value: action.value,
        error: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: true,
        helper: action.value,
      };
    }
    default:
      throw new Error();
  }
};

export const LoginContainer: FC = () => {
  const history = useHistory();
  const { state: locationState } = useLocation<{ from: string }>();
  const { loginWithEmailAndPassword, loginWithOauthPopup } = useAuthContext();

  const [authError, setAuthError] = useState("");
  const [emailState, dispatchEmail] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: "email",
    value: "",
  });

  const [passwordState, dispatchPassword] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: "password",
    value: "",
  });

  const processLogin = (loginPromise: Promise<TLoginWithEmailAndPasswordResult>) => {
    return loginPromise
      .then(() => {
        history.push(locationState?.from || "/admin");
      })
      .catch((error) => setAuthError(error.message || "error"));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(emailState.value)) {
      dispatchEmail({ type: "error", value: "Введите корректный email" });
      isValid = false;
    }

    if (passwordState.value.length <= 6) {
      dispatchPassword({ type: "error", value: "Длина пароля должна быть больше 6 символов" });
      isValid = false;
    }

    if (isValid) {
      processLogin(loginWithEmailAndPassword(emailState.value, passwordState.value));
    }
  };

  const onOauthLogin = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const dataset = (evt.target as HTMLElement)?.closest<HTMLLinkElement>(".login-oauth-container__item")?.dataset;
    if (dataset?.provider) {
      processLogin(loginWithOauthPopup(dataset?.provider));
    }
  };

  return (
    <div className="login-container">
      {authError && (
        <Typography variant="subtitle2" color="error" sx={{ m: 2 }}>
          {authError}
        </Typography>
      )}
      <LoginForm
        email={{
          ...emailState,
          onChange: (e) => dispatchEmail({ type: "change", value: e.target.value }),
        }}
        password={{
          ...passwordState,
          onChange: (e) => dispatchPassword({ type: "change", value: e.target.value }),
        }}
        onSubmit={onSubmit}
      />
      <div className="login-oauth-container">
        {Object.keys(ALLOWED_OAUTH_PROVIDERS).map((key) => {
          return (
            <Link href="#" key={key} className="login-oauth-container__item" data-provider={key} onClick={onOauthLogin}>
              {getOAuthProviderIcon(key)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
