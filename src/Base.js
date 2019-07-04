import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Loading from "./views/Loading";
import App from "./App";
import { useAuth0 } from "./react-auth0-spa";

// styles
import "samples-bootstrap-theme/dist/css/auth0-theme.css";
import "./App.css";

/* //fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();
*/
const Base = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
        <App />
  );
};

export default Base;