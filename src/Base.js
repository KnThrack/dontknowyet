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


async function getToken(getTokenSilently) {
 // add auth token to axios
 
  const token = await getTokenSilently();
  axios.defaults.headers.put['Authorization-Type'] = 'basic '+ token;
  axios.defaults.headers.post['Authorization-Type'] = 'basic '+ token;
  axios.defaults.headers.get['Authorization-Type'] = 'basic '+ token;
}

const Base = () => {
  const { getTokenSilently } = useAuth0();
  const { loading } = useAuth0();
   
  if (loading) {
    return <Loading />;
  }

  getToken(getTokenSilently)
  return (
        <App />
  );
};

export default Base;