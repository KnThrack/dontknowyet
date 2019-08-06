import React from "react";
import { Loading } from "./views";
import App from "./App";
import { useAuth0 } from "./react-auth0-spa";
import axios from "axios";

// styles
//import "samples-bootstrap-theme/dist/css/auth0-theme.css";
import "./App.scss";
/* //fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();
*/

async function getToken(getTokenSilently) {
	// add auth token to axios

	const token = await getTokenSilently();
	// set auth headers
	return token;
}

const Base = () => {
	const { getTokenSilently } = useAuth0();
	const { loading, user } = useAuth0();

	/*
	if (loading) {
		return <Loading />;
	}
*/
	return <App token={getToken(getTokenSilently)} user={user} />;
};

export default Base;
