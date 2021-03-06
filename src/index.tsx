import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Base from './Base';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";

// A function that routes the user to the right place
// after login
/*
const onRedirectCallback = (appState: { targetUrl: string | null | undefined; }) => {
    window.history.replaceState(
      {},
      document.title,
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };
  */
  const onRedirectCallback = () =>
  window.history.replaceState({}, document.title, window.location.pathname);
// render stuff
  ReactDOM.render(
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      audience={config.audience}
      onRedirectCallback={onRedirectCallback}>
      <Base />
    </Auth0Provider>,
    document.getElementById("root")
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



