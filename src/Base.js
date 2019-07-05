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
const { getTokenSilently } = useAuth0();

async function getToken() {
 // add auth token to axios
  const token = await getTokenSilently();
  axios.defaults.headers.put['Authorization-Type'] = 'basic '+ token;

}

const Base = () => {

  const { loading } = useAuth0();
   
  if (loading) {
    return <Loading />;
  }
  
  this.getToken()
  return (
        <App />
  );
};

export default Base;