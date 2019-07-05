import React from "react";
import Loading from "./views/Loading";
import App from "./App";
import { useAuth0 } from "./react-auth0-spa";
import axios from 'axios';

// styles
//import "samples-bootstrap-theme/dist/css/auth0-theme.css";
import "./App.css";
/* //fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();
*/


function getToken(getTokenSilently) {
  // add auth token to axios

  const token = getTokenSilently();
  return token;
}

const Base = () => {
  const { getTokenSilently } = useAuth0();
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  const token = getToken(getTokenSilently);
  return (
    <App token={token} />
  );
};

export default Base;