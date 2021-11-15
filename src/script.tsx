import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './common.css';
import { App } from './Components/App/App';
import { AuthContextProvider } from './features/auth/AuthContextProvider';

ReactDOM.render(
  <AuthContextProvider>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>,
  document.getElementById('root')
);
