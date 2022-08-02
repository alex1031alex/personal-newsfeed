import { LoginForm, TLoginField } from '@components/LoginForm/LoginForm';
import React, { FC, Reducer, useReducer, useState } from 'react';
import './LoginContainer.css';
import { validateEmail } from './utils';
import { useAuthContext } from '../AuthContextProvider';
import Typography from '@mui/material/Typography';
import { useHistory, useLocation } from 'react-router-dom';

type TLoginFieldState = Omit<TLoginField, 'onChange'>;
type TAction = {
  type: 'change' | 'error';
  value: string;
};

const reducer = (state: TLoginFieldState, action: TAction): TLoginFieldState => {
  switch (action.type) {
    case 'change': {
      return {
        ...state,
        value: action.value,
        error: false,
      };
    }

    case 'error': {
      return {
        ...state,
        error: true,
        helper: action.value,
      };
    }
  }
  return state;
};

export const LoginContainer: FC = () => {
  const [authError, setAuthError] = useState();
  const { loginWithEmailAndPassword } = useAuthContext();
  const history = useHistory();
  const { state: locationState } = useLocation<{ from: string }>();
  const [emailState, dispatchEmail] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: 'email',
    value: '',
  });

  const [passwordState, dispatchPassword] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: 'password',
    value: '',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(emailState.value)) {
      isValid = false;
      dispatchEmail({ type: 'error', value: 'Введите корректный email' });
    }
    //  Здесь должна быть валидация пароля
    if (passwordState.value.length <= 6) {
      isValid = false;
      dispatchPassword({ type: 'error', value: 'Длина пароля должна быть больше 6 символов' });
    }

    if (isValid) {
      loginWithEmailAndPassword(emailState.value, passwordState.value)
        .then(() => {
          history.push(locationState?.from || '/admin');
        })
        .catch((error) => setAuthError(error.message || 'error'));
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
          onChange: (e) => dispatchEmail({ type: 'change', value: e.target.value }),
        }}
        password={{
          ...passwordState,
          onChange: (e) => dispatchPassword({ type: 'change', value: e.target.value }),
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};
