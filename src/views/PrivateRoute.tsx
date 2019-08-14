// src/views/PrivateRoute.js
import React, { FunctionComponent, useEffect, Component } from "react";
import RouterTypes from "react-router-dom";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

/**
 * @classdesc PrivateRoute handler for the routes that need authentication
 * @exports PrivateRoute
 * @constructor
 */
const PrivateRoute : FunctionComponent<RouterTypes.RouteProps> = ({ render: Render, component: RoutePropsComponent, path, ...rest }) => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();

	useEffect(() => {
		const fn = async () => {
			if (!isAuthenticated) {

				await loginWithRedirect({
					redirect_uri: "https://dev-dontknowyet.herokuapp.com/",
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
		const render = (props: RouterTypes.RouteComponentProps<any>) => <Component {...props} />;
		return <Route path={path} render={render} {...rest} />;
	}
};

/*
PrivateRoute.propTypes = {
	render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired
};
*/
export { PrivateRoute };

