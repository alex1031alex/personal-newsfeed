import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./common.css";
import { App } from "@app/components/App/App";
import { initializeAPI } from "./api";
import { AuthContextProvider } from "./features/auth/AuthContextProvider";
const firebaseApp = initializeAPI();

ReactDOM.render(
  <Provider store={}>
    <AuthContextProvider firebaseApp={firebaseApp}>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </Provider>,
  document.getElementById("root")
);
