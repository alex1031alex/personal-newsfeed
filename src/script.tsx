import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './common.css';
import { App } from './Components/App/App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
