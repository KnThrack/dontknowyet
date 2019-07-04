import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const PrivateRoute = ({ Render, Component, path, ...rest }) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        const fn = async () => {
            if (!isAuthenticated) {
                await loginWithRedirect({
                    appState: { targetUrl: path }
                });
            }
        };
        fn();
    }, [isAuthenticated, loginWithRedirect, path]);

    if (Render) {
        const render = Render;
        return <Route path={path} render={render} {...rest} />;
    } else {
        const render = props => <Component {...props} />;
        return <Route path={path} render={render} {...rest} />;
    }
};

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
      .isRequired,
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired
  };

export default PrivateRoute;